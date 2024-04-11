import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Context } from '../context/MainCointext';
import { useNavigate } from "react-router-dom";
import History from '../components/History';

export default function Listing() {
    const { weatherComp } = useContext(Context)
    const [listData, setListData] = useState([]);
    const [check, setCheck] = useState();
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const navigator = useNavigate()
    const inpRef = useRef();

    useEffect(
        () => {
            const lsHistory = localStorage.getItem("history");
            if (lsHistory != null) {
                setHistory(JSON.parse(lsHistory));
            }
        }, []
    )
    useEffect(
        () => {
            if (history != "") {
                localStorage.setItem("history", JSON.stringify(history));
            }
        }, [history]
    )

    const listingData = (e) => {
        const cityName = inpRef.current.value;
        setCheck(inpRef.current.value)
        if (e.key == "Enter" && cityName != "") {
            setHistory([
                cityName,
                ...history
            ]);
            // search data
            axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=ee7fbadced21aba9172eb41826abc8a5`)
                .then(
                    (success) => {
                        if (success.status == 200) {
                            setLoading(false);
                            setSearchData(success.data);
                        } else {
                            setLoading(false)
                        }
                    }
                ).catch(
                    (error) => {
                        setLoading(true)
                    }
                )
            inpRef.current.value = "";
        } else {
            axios.get("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100")
                .then(
                    (success) => {
                        if (success.status == 200) {
                            setLoading(false);
                            setListData(success.data.results);
                        } else {
                            setLoading(false)
                        }
                    }
                ).catch(
                    (error) => {
                        setLoading(true)
                    }
                )
        }
    }

    function goOnWeather(lat, lon) {
        navigator("/weather");
        weatherComp(lat, lon);
    }

    function clearAll() {
        setHistory([]);
        localStorage.removeItem("history");
    }

    return (
        <>
            <div className='container mx-auto my-3 text-3xl text-center border-b-2 p-2'>
                Weather History
            </div>
            <div className='container mx-auto my-3 md:flex p-2'>
                <div className='w-1/2'>
                    <label htmlFor="search" className='me-3 text-lg font-semibold'>Search :</label>
                    <input ref={inpRef} onKeyUp={(e) => listingData(e)} type="text" name='search' className='border focus:outline-none p-1 rounded shadow-sm' />
                    <div className='my-2 text-sm text-slate-500'>Please press "Enter"</div>
                </div>
                <div className='md:w-1/2 w-full'>
                    <History history={history} clearAll={clearAll} />
                </div>
            </div>
            <div className="w-[95%] mx-auto flex flex-col overflow-x-auto border p-2 rounded-lg shadow-lg">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        {check != "" ? <>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">City Name</th>
                                            <th scope="col" className="px-6 py-4">State Name</th>
                                            <th scope="col" className="px-6 py-4">Country Code</th>
                                            <th scope="col" className="px-6 py-4">Coordinates</th>
                                        </> : <>
                                            <th scope="col" className="px-6 py-4">#</th>
                                            <th scope="col" className="px-6 py-4">City Name</th>
                                            <th scope="col" className="px-6 py-4">Country Name</th>
                                            <th scope="col" className="px-6 py-4">Country Code</th>
                                            <th scope="col" className="px-6 py-4">Coordinates</th>
                                            <th scope="col" className="px-6 py-4">Population</th>
                                            <th scope="col" className="px-6 py-4">Timezone</th>
                                        </>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <tr className='col-span-4'>Please wait for internet Connection</tr> : <>
                                            {
                                                check != "" ?
                                                    searchData?.map(
                                                        (data, i) => {
                                                            return <tr key={i} onClick={() => goOnWeather(data.lat, data.lon)}
                                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.state}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.country}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <span>lat : {data.lat}</span>
                                                                    <br />
                                                                    <span>lon : {data.lon}</span>
                                                                </td>
                                                            </tr>
                                                        }
                                                    )
                                                    :
                                                    listData?.map(
                                                        (data, i) => {
                                                            return <tr key={i} onClick={() => goOnWeather(data.coordinates.lat, data.coordinates.lon)}
                                                                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer">
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium">{i + 1}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.name}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.cou_name_en}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.country_code}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">
                                                                    <span>lat : {data.coordinates.lat}</span>
                                                                    <br />
                                                                    <span>lon : {data.coordinates.lon}</span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.population}</td>
                                                                <td className="whitespace-nowrap px-6 py-4">{data.timezone}</td>
                                                            </tr>
                                                        }
                                                    )
                                            }
                                        </>
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}