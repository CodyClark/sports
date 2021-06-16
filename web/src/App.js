import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sport from './boards/Sport.js';
import Pga from './boards/Pga.js';
import ImageBoard from './boards/ImageBoard.js';
import Clock from './boards/Clock.js';
import Board from './Board.js';
import Sys from './boards/Sys.js';
import TopNav from './Nav.js';
import All from './All.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faCogs, faClock } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faCogs, faClock)

var BACKEND = "http://" + window.location.host

class App extends React.Component {
  screenOn() {
    console.log("Turning screen on")
    fetch(`${BACKEND}/api/screenon`, {
      method: "GET",
      mode: "cors",
    });
  }
  screenOff() {
    console.log("Turning screen off")
    fetch(`${BACKEND}/api/screenoff`, {
      method: "GET",
      mode: "cors",
    });
  }

  render() {
    return (
      <>
        <Router>
          <TopNav />
          <Route path="/" exact component={All} />
          <Route path="/nhl" render={() => <Sport sport="nhl" />} />
          <Route path="/mlb" render={() => <Sport sport="mlb" />} />
          <Route path="/pga" render={() => <Pga />} />
          <Route path="/ncaam" render={() => <Sport sport="ncaam" />} />
          <Route path="/nba" render={() => <Sport sport="nba" />} />
          <Route path="/nfl" render={() => <Sport sport="nfl" />} />
          <Route path="/mls" render={() => <Sport sport="mls" />} />
          <Route path="/img" exact component={ImageBoard} />
          <Route path="/clock" exact component={Clock} />
          <Route path="/sys" exact component={Sys} />
          <Route path="/board" exact component={Board} />
        </Router>
        <hr />
      </>
    );
  }
}
export default App;