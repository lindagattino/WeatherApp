import axios from "axios";
import { useEffect } from "react";
import { usePosition } from "use-position";
import WeatherIcon from 'react-icons-weather';
import { useState } from "react";
import { curLatitude, curLongitude, currentWeather, curWeather, latitudeWeather, longitudeWeather } from "../reducers/dataSlice.js";
import { useDispatch, useSelector } from "react-redux";

const CurrentWeather = () => {

    const { latitude, longitude, error } = usePosition();
    const { config } = require('./../config.js'); 

    const key = config.open_weather_key;

    const stateLatitude = useSelector(curLatitude);
    const stateLongitude = useSelector(curLongitude);
    const stateWeather = useSelector(curWeather);
    const dispatch = useDispatch();

    useEffect(() => {
        if((latitude && longitude) && stateLatitude !== latitude && stateLongitude !== longitude) {
            dispatch(latitudeWeather(latitude));
            dispatch(longitudeWeather(longitude));

            if(!stateWeather){
                getCurrentWeather(latitude, longitude);
            }
        }else{ 
            if(!stateWeather){
                getCurrentWeather(latitude, longitude);
            }
        }
    }, [latitude, longitude]);


    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    async function getCurrentWeather(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=it`);
            const weather = {
                cod: response?.data?.weather[0]?.id + '',
                temp: Math.round(response?.data?.main?.temp),
                desc: response?.data?.weather[0]?.description,
                date: new Date(response?.data?.dt*1000),
                loc: response?.data?.name
            };
            dispatch(currentWeather(weather));
        } catch (error) {
            console.error(error);
        }
    }
    const norm = (n) => {
        return ('0' + n).slice(-2)
    }
    return (
        <div className="current page">
            {
                (stateWeather?.loc) && <div className="content">
                    <div className="temp">
                        <WeatherIcon name="owm" iconId={stateWeather.cod} flip="horizontal" rotate="90" />
                        <span className="text">{stateWeather.temp}°C</span>
                    </div>
                    <p className="claim">Oggi a&nbsp;<span className="location">{stateWeather.loc}</span>&nbsp;c'è&nbsp;<span className="weather">{stateWeather.desc}</span></p>
                    <p className="lastUpdate">Ultimo aggiornamento {norm(stateWeather.date.getDate())}-{norm(stateWeather.date.getMonth() + 1)}-{stateWeather.date.getFullYear()}, {norm(stateWeather.date.getHours())}:{norm(stateWeather.date.getMinutes())}:{norm(stateWeather.date.getSeconds())}</p>
                    <br />
                    <p className="poweredBy">powered by Synesthesia</p>
                </div>

            }

        </div>
    );
};
export default CurrentWeather;
