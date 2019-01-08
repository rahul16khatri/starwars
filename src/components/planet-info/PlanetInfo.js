import React, { Component } from 'react';
import Header from '../header/Header'

class PlanetInfo extends Component {

    constructor (props) {
        super(props);

        this.state={

        }
    }

    logout = () => {
        localStorage.clear();
        this.state.login && this.setState({
            login: false
        })
    }

  render() {
    return (
    <React.Fragment>    
     <Header />
     <span className="pull-right" onClick={this.logout}>Logout</span>
      <div className="planet-info">

      <h1>Planet Information</h1>
        <span className="make-green">Planet name:</span> {this.props.location.state.currentPlanet.name} <br />
        <span className="make-green">Rotation period:</span> {this.props.location.state.currentPlanet.rotation_period} <br />
        <span className="make-green">Diameter:</span> {this.props.location.state.currentPlanet.diameter} <br />
        <span className="make-green">Terrain:</span> {this.props.location.state.currentPlanet.terrain} <br />
        <span className="make-green">Population:</span> {this.props.location.state.currentPlanet.population} <br />
        <span className="make-green">Created:</span> {this.props.location.state.currentPlanet.created} <br />
        <span className="make-green">Edited:</span> {this.props.location.state.currentPlanet.edited}
      </div>
    </React.Fragment>
    );
  }
}

export default PlanetInfo;
