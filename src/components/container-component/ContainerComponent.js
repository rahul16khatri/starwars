import React, {Component} from 'react'
import Header from '../header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'

function searchingFor(term){
    return function(x) {
        debugger
        return x.name.toLowerCase().includes(term) || !term;
    }
}

class ContainerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: false,
            term: '',
            isValid: true
        }
    }

    userLogin = (event) => {
        event.preventDefault();
        let checkUsername = this.state.username
        let checkPassword = this.state.password
        let loginUser = this.state.people.filter(function(person){
            if(person.name == checkUsername && person.birth_year == checkPassword){
                return true
            }
        })
        if (loginUser.length != 0) {
            this.setState({
                login: true
            }, function(){
                localStorage.setItem('login', true)
                localStorage.setItem('user', checkUsername)
            })
        } else {
            this.setState({
                isValid: false
            })
        }
    }

    getUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    getPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    searchHandler = (event) => {
        this.setState({
            term: event.target.value
        })
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            login: false
        })
    }

    removeValidation = () => {
        this.setState({
            isValid: true
        })
    }

    componentWillMount () {
        axios
        .get('https://swapi.co/api/planets/')
        .then(res => {
            this.setState({
                planets: res.data.results
            })
        })

        axios
        .get('https://swapi.co/api/people/')
        .then(res => {
            this.setState({
                people: res.data.results
            })
        })
    }

    render (){
        return (
            <div className="main-container">
                <Header />
                {!localStorage.getItem('login') ? 
                <div className="main">
                 <form className="login-form">
                    <h1>Welcome to Starwars!</h1>
                   <input className="input-styles" onFocus={this.removeValidation} onChange={this.getUsername} value={this.state.username} type="text" placeholder="Username"></input> <br />
                   <input className="input-styles" onFocus={this.removeValidation} onChange={this.getPassword} value={this.state.password} type="password" placeholder="Password"></input> <br />
                    {!this.state.isValid ? <span className="make-red">Username and Password doesn't match</span>: ''}
                    <br /><br /><button onClick={this.userLogin} className="login">Login</button> &nbsp;
                 </form>
                </div> :
                <div className="dashboard">
                    <div><h1>Welcome! {localStorage.getItem('user')} </h1> <span className="pull-right" onClick={this.logout}>Logout</span></div>
                    <input className="input-styles" onChange={this.searchHandler} type="text" placeholder="Search for a Planet"></input> <br />
                     {this.state.planets ? <div className='planet-container'>
                        {
                            this.state.planets && this.state.planets.filter(searchingFor(this.state.term)).map(function(planet){
                                return (
                                     <Link to={{pathname: '/planetInfo', state:{currentPlanet: planet}}}>
                                        <div className="planet-info">
                                            Planet name: {planet.name} <br />
                                        </div>
                                     </Link> 
                                )
                            })
                        }
                    </div> : 'Loading planets...'}
                </div>}
            </div>
        )
    }
}

export default ContainerComponent;