
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

  const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames={canSlide(location.pathname)?'slide':''} timeout={canSlide(location.pathname)?1000:0}>
        <Switch location={location}>
          <Route path="/" exact><CurrentWeather /></Route>
          <Route path="/forecast"><Next3DaysForcast /></Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ));
//<AnimatedSwitch></AnimatedSwitch>
  return (
    <div className="App page">
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/"><Home /></Route>
          <Route path="/current" ><Home /></Route>
          <Route path="/forecast"><Home /></Route>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
