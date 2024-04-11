import axios from 'axios';
import React, { useState } from 'react';
import { createContext } from 'react';

const Context = createContext();

const MainCointext = (props) => {
    const [currentWeather, setCurrentWeather] = useState(null)
    const apiKey = "ee7fbadced21aba9172eb41826abc8a5";

    const weatherComp = (lat, lon) => {
        if (lat != undefined && lon != undefined) {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                .then(
                    (success) => {
                        if (success.status == 200) {
                            console.log("successz");
                            setCurrentWeather(success.data);
                            localStorage.setItem("weatherData", JSON.stringify(success.data))
                        }else{
                            console.log("Api not working");
                        }
                    }
                ).catch(
                    (error) => {
                    }
                )
        }else{
            setCurrentWeather(undefined)
        }
    }

    return (
        <Context.Provider value={{ weatherComp, currentWeather }}>
            {props.children}
        </Context.Provider>
    );
}

export default MainCointext;
export { Context }