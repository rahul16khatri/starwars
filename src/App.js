import React, { Component } from 'react';
import './App.css';
import ContainerComponent from './components/container-component/ContainerComponent'
import {BrowserRouter, Route} from 'react-router-dom'
import PlanetInfo from './components/planet-info/PlanetInfo'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ContainerComponent} />
          <Route exact path="/planetInfo" component={PlanetInfo} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
