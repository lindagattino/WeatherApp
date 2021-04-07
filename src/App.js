
import './App.css';
import store from './store';
import { Route, Switch, withRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import CurrentWeather from './pages/CurrentWeather';
import Next3DaysForcast from './pages/Next3DaysForcast';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Provider } from 'react-redux';
import Home from './pages/Home';


function App() {

  const canSlide = (pathname) => {
    let doTransition = false;
    if(pathname === '/forecast'){
      doTransition = true
    }
    return doTransition;
  }


  return (
    <div className="App page">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/"><Home /></Route> 
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
