import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/MainCointext';

const Weather = () => {
    const { weatherComp, currentWeather } = useContext(Context);
    const [weatherData, setWeatherData] = useState(null);
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(currentDate);
    const [celsius, setCelsius] = useState('');

    useEffect(
        () => {
            weatherComp();
            if (currentWeather == undefined) {
                const lsData = localStorage.getItem("weatherData");
                if (lsData != null) {
                    setWeatherData(JSON.parse(lsData));
                }
            } else if (currentWeather == null) {
                setWeatherData("");
            } else {
                setWeatherData(currentWeather);
            }
            kTodeg();
        }, [currentWeather]
    )

    function kTodeg(kelvin = weatherData?.main.temp) {
        const kelvinValue = parseFloat(kelvin);
        if (!isNaN(kelvinValue)) {
            const celsiusValue = kelvinValue - 273.15;
            setCelsius(celsiusValue.toFixed(2));
        } else {
            setCelsius('');
        }
    }

    return (
        <>
            <div className='border w-[95%] sm:w-[60%] md:w-[60%] lg:w-[40%] mx-auto shadow-lg p-6 rounded-lg mt-[5%]'>
                <div className='font-bold text-lg'>{formattedDate}</div>
                <div className='border-b flex justify-between py-3 mb-2'>
                    <div>
                        <div className='text-slate-500'>{weatherData?.name}, {weatherData?.sys.country}</div>
                        <span className='block text-3xl font-bold'>{celsius} °C</span>
                        <span><b>Weather:</b> {weatherData?.weather[0].main}</span>
                        <br />
                        <span>{weatherData?.weather[0].description}</span>
                    </div>
                    <span>
                        <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt="" />
                    </span>
                </div>
                <div className='border-b pb-4 mb-2'>
                    <h1 className="text-xl font-bold text-slate-600 hover:text-slate-800 transition duration-300 ease-in-out">
                        Data
                    </h1>
                    <div>
                        <span><b>Temperature: </b>{weatherData?.main.temp} K</span>
                        <br />
                        <div className='flex justify-start'><span className='w-1/2'><b>Min: </b>{weatherData?.main.temp_max} K</span><span className='w-1/2'> <b>Max: </b>{weatherData?.main.temp_min} K</span></div>
                        <span><b>Sea Level: </b>{weatherData?.main.sea_level} hPa </span>
                        <br />
                        <span><b>Round Level: </b>{weatherData?.main.sea_level} hPa </span>
                        <br />
                        <span><b>Presure: </b>{weatherData?.main.pressure} hPa</span>
                        <br />
                        <span><b>Humidity: </b>{weatherData?.main.humidity}%</span>
                    </div>
                </div>
                <div className='border-b pb-4 mb-2'>
                    <h1 className="text-xl font-bold text-slate-600 hover:text-slate-800 transition duration-300 ease-in-out">
                        Wind
                    </h1>
                    <div>
                        <span><b>Direction: </b>{weatherData?.wind.deg}</span>
                        <br />
                        <span><b>Gust: </b> {weatherData?.wind.gust}</span>
                        <br />
                        <span><b>Speed: </b>{weatherData?.wind.speed}</span>
                    </div>
                </div>
                <div className='flex justify-around mt-3 border-b pb-3 mb-2'>
                    <div className='flex flex-col items-center'>
                        <div>
                            <img src="./img/sunrise.png" alt="" />
                        </div>
                        <div>Sunrise</div>
                        <div className='font-bold'>{weatherData?.sys?.sunrise}</div>
                    </div>
                    <div className='border-s'></div>
                    <div className='flex flex-col items-center'>
                        <div>
                            <img src="./img/sunset.png" alt="" />
                        </div>
                        <div>Sunset</div>
                        <div className='font-bold'>{weatherData?.sys?.sunset}</div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl mb-1 font-bold text-slate-600 hover:text-slate-800 transition duration-300 ease-in-out">
                        Coordinates
                    </h1>
                    <div className='flex justify-start'><span className='w-1/2'><b>lat: </b>{weatherData?.coord?.lat} K</span><span className='w-1/2'> <b>lon: </b>{weatherData?.coord?.lon} K</span></div>
                </div>
                <div><b>Timezone: </b>{weatherData?.timezone}</div>
                <div><b>Visibility: </b>{weatherData?.visibility}</div>
            </div>
        </>
    );
}

export default Weather;
