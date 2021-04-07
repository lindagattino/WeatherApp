import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { usePosition } from "use-position";
import WeatherView from "../components/molecules/WeatherView";

const Next3DaysForcast = () => {

    const history = useHistory();
    const [forecast, setForecast] = useState([]);
    const { latitude, longitude, error } = usePosition();
    const v = history.location.pathname == '/forecast';
    const [open, setOpen] = useState(v);
    let prevLat, prevLon, timeout;

    useEffect(() => {
        timeout = setTimeout(() => {history.push(open?'/forecast':'/current');}, 500);
    }, [open]);

    
    useEffect(() => {
        return(() => {clearTimeout(timeout);});
    }, []);
    
    useEffect(() => {
        if ((latitude && longitude) && prevLat !== latitude && prevLon !== longitude) {
            prevLat = latitude;
            prevLon = longitude;
            getForecastWeather(latitude, longitude);
        }
    }, [latitude, longitude]);


    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    async function getForecastWeather(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=e42b8a64b85c3678b32ad32616604960&units=metric&lang=it&exclude=daily,minutely,current,alerts`);
            const filtered = response?.data?.hourly.filter(el => {
                const date = new Date(el.dt * 1000);
                return date.getHours()%3 == 0;
            }) || [];
            setForecast(filtered);
        } catch (error) {
            console.error(error);
        }
    }

    const toggle = () => {
        setOpen(!open);
    };
    
    return(
        forecast && <div className={`forecast page ${open?'open':''}`}>
            <div className="content">
                <h1>Previsioni</h1>
                <ul className="list">
                    {
                    forecast.map((f, i) => {
                        return <li key={i}><WeatherView data={f}></WeatherView></li>}
                    )
                    }
                </ul>
            </div>
            <div className="handle" onClick={toggle}>|||</div>
        </div>
    );
};
export default Next3DaysForcast;