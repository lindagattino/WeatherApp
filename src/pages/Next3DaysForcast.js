import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { usePosition } from "use-position";
import WeatherView from "../components/molecules/WeatherView";
import { latitudeWeather, curForecasts, longitudeWeather, curLatitude, curLongitude, forecastWeather } from "../reducers/dataSlice";

const Next3DaysForcast = () => {

    const history = useHistory();
    const { latitude, longitude, error } = usePosition();
    const o = history.location.pathname === '/forecast';
    const [open, setOpen] = useState(o);
    const { config } = require('./../config.js'); 

    const key = config.open_weather_key;
    
    const stateLatitude = useSelector(curLatitude);
    const stateLongitude = useSelector(curLongitude);
    const stateForecasts = useSelector(curForecasts);
    const dispatch = useDispatch();


    useEffect(() => {
       // const v = history.location.pathname === '/forecast';
        setTimeout(() => {history.push(open?'/forecast':'/current');}, 500);
    }, [open]);
    

    useEffect(() => {
        if((latitude && longitude) && stateLatitude !== latitude && stateLongitude !== longitude) {
            dispatch(latitudeWeather(latitude));
            dispatch(longitudeWeather(longitude));
            if(stateForecasts.length === 0){
                getForecastWeather(latitude, longitude);
            }
        }else{
            if(stateForecasts.length === 0){
                getForecastWeather(latitude, longitude);
            }
        }
    }, [latitude, longitude]);


    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    async function getForecastWeather(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric&lang=it&exclude=daily,minutely,current,alerts`);
            const filtered = response?.data?.hourly.filter(el => {
                const date = new Date(el.dt * 1000);
                return date.getHours()%4 === 0;
            }) || [];
            dispatch(forecastWeather(filtered));
        } catch (error) {
            console.error(error);
        }
    }

    const toggle = () => {
        setOpen(!open);
    };
    
    return(
        stateForecasts && <div className={`forecast page ${open?'open':''}`}>
            <div className="content">
                <h1>Previsioni</h1>
                <ul className="list">
                    {
                    stateForecasts.map((f, i) => {
                        return <li key={i}><WeatherView data={f}></WeatherView></li>}
                    )
                    }
                </ul>
            </div>
            <div className="handler" onClick={toggle}>|||</div>
        </div>
    );
};
export default Next3DaysForcast;