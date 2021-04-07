import axios from "axios";
import { useEffect } from "react";
import { usePosition } from "use-position";
import WeatherIcon from 'react-icons-weather';
import { useState } from "react";

const CurrentWeather = () => {

    const { latitude, longitude, error } = usePosition();
    const [cod, setCod] = useState();
    const [temp, setTemp] = useState();
    const [desc, setDesc] = useState();
    const [loc, setLoc] = useState();
    const [date, setDate] = useState();
    let prevLat, prevLon;

    useEffect(() => {
        if ((latitude && longitude) && prevLat !== latitude && prevLon !== longitude) {
            prevLat = latitude;
            prevLon = longitude;
            getCurrentWeather(latitude, longitude);
        }
    }, [latitude, longitude]);


    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    async function getCurrentWeather(latitude, longitude) {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e42b8a64b85c3678b32ad32616604960&units=metric&lang=it`);
            setCod(response?.data?.cod);
            setTemp(Math.round(response?.data?.main?.temp_max));
            setDesc(response?.data?.weather[0]?.description);
            setDate(new Date());
            setLoc(response?.data?.name);
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
                (loc) && <div className="content">
                    <div className="temp">
                        <WeatherIcon name="owm" iconId={''+cod} flip="horizontal" rotate="90" />
                        <span className="text">{temp}°C</span>
                    </div>
                    <p className="claim">Oggi a <span className="location">{loc}</span> c'è <span className="weather">{desc}</span></p>
                    <p className="lastUpdate">Ultimo aggiornamento {norm(date.getDate())}-{norm(date.getMonth() + 1)}-{date.getFullYear()}, {norm(date.getHours())}:{norm(date.getMinutes())}:{norm(date.getSeconds())}</p>
                    <br />
                    <p className="poweredBy">powered by Synesthesia</p>
                </div>

            }

        </div>
    );
};
export default CurrentWeather;
