import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CurrentWeather from "./CurrentWeather";
import Next3DaysForcast from "./Next3DaysForcast";



const Home = () => {

  const history = useHistory();

  useEffect(() => {
    if(history?.location?.pathname === '/'){
      //history.push("/current");
    }
  }, [history]);

  return (
    <div className="home">
      <CurrentWeather></CurrentWeather>
      <Next3DaysForcast></Next3DaysForcast>
    </div>
  );
};
export default Home;
