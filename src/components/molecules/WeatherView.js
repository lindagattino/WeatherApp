
import WeatherIcon from 'react-icons-weather';

const WeatherView = (props) => {
    const desc = props.data.weather[0].description;
    const cod = props.data.weather[0].id;
    const date = new Date( props.data.dt * 1000);
    const norm = (n) => {
        return ('0' + n).slice(-2)
    }
    return (
        cod && <div className="listItem">
            <WeatherIcon name="owm" iconId={cod} flip="horizontal" rotate="90" />
            <div className="inner">
                <span className="atTime">{norm(date.getDate())}/{norm(date.getMonth() + 1)}/{norm(date.getFullYear())} alle {norm(date.getHours())}:{norm(date.getMinutes())}</span>
                <span className="weather">{desc}</span>
            </div>

        </div>
    );
};
export default WeatherView;
