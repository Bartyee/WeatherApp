import React, {Component} from 'react';
import axios from 'axios';
import classes from '../src/style/CurrentWeather.css';
import iconHumidity from "./img/015-humidity.png";
import iconPressure from "./img/003-moon.png";
import iconWindSpeed from "./img/014-wind-sign.png";
import iconClouds from "./img/030-cloudy.png";


const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";

class CurrentWeather extends Component {
    
    state = {
        cityName: this.props.cityName,
        cityCountry: this.props.cityCountry,

        currentWeather: null,

        weather: {
            city: {
                name: null,
                id: null
            },
            current: {
                humidity: null,
                pressure: null,
                temperature: null,
                description: null,
                windSpeed: null,
                clouds: null,
                icon: null
            }
        }
    }

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps){
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${nextProps.cityName},${nextProps.cityCountry}&appid=${API_KEY}&units=metric`)
        
            .then(res => {
                const data = res.data;
                this.setState({
                    ...this.state,
                    currentWeather: {...data}
                })
                
                this.weatherDataFormat();
            })
            .catch(error =>{
                this.setState({
                    ...this.state,
                    currentWeather: "Limit zapytań został wyczerpany!"
                })
            })
    }

    weatherDataFormat = () => {
        this.setState({

            ...this.state,

            weather: {
                city: {
                    name: this.state.currentWeather.name,
                    id: this.state.currentWeather.id
                },
                current: {
                   humidity: this.state.currentWeather.main.humidity,
                   pressure: this.state.currentWeather.main.pressure,
                   temperature: this.state.currentWeather.main.temp,
                   description: this.state.currentWeather.weather[0].description,
                   windSpeed: this.state.currentWeather.wind.speed,
                   clouds: this.state.currentWeather.clouds.all,
                   icon: 'http://openweathermap.org/img/w/' + this.state.currentWeather.weather[0].icon + '.png'
                }
            }
        })
    }

    render(){
        return(
            <div className="currentWeather">
                <div className='cityInfo-left'>
                    <div className='cityInfo-left__icoAndcityName'>
                        {this.state.weather.current.icon && <img className='cityInfo-left__icoAndcityName--icon' src={this.state.weather.current.icon} />}
                        {this.state.weather.city.name && <p className='cityInfo-left__icoAndcityName--cityName'>{this.state.weather.city.name}</p>}
                    </div>
                    <div className='cityInfo-left__description'>
                        {this.state.weather.current.description && <p className='cityInfo-left__description--description'>{this.state.weather.current.description}</p>}
                    </div>
                </div>
                <div className='cityInfo-right'>
                    <div className='cityInfo-left__tempAnddetails'>
                        <div className='cityInfo-left__tempAnddetails--temp'>
                        {this.state.weather.current.temperature && <p>{this.state.weather.current.temperature} &deg;C</p>}
                        </div>
                        <div className='cityInfo-left__tempAnddetails__details'>
                            <div className='cityInfo-left__tempAnddetails__details--humidity tempAnddetails__details'>
                                {this.state.weather.current.humidity && <img src={iconHumidity} />}
                                <p>chuj</p>
                            </div>
                            <div className='cityInfo-left__tempAnddetails__details--pressure tempAnddetails__details'>
                                {this.state.weather.current.pressure && <img src={iconPressure} />}
                                <p>chuj</p>
                            </div>
                            <div className='cityInfo-left__tempAnddetails__details--windSpeed tempAnddetails__details'>
                                {this.state.weather.current.windSpeed && <img src={iconWindSpeed} />}
                                <p>chuj</p>
                            </div>
                            <div className='cityInfo-left__tempAnddetails__details--clouds tempAnddetails__details'>
                                {this.state.weather.current.clouds && <img src={iconClouds} /> + '%'}
                                <p>chuj</p>
                            </div>
                            
                            
                        </div>

                    </div>
                </div>
                
                 

                {/*

                {this.state.weather.current.humidity && <p className='currentWeather__humidity'>Humidity: {this.state.weather.current.pressure} hpA</p>}

                {this.state.weather.current.pressure && <p className='currentWeather__pressure'>Pressure: {this.state.weather.current.pressure}%</p>} 

                {this.state.weather.current.windSpeed && <p className='currentWeather__windSpeed'>WindSpeed: {this.state.weather.current.windSpeed}mps</p>}  

                {this.state.weather.current.clouds && <p className='currentWeather__clouds'>Clouds: {this.state.weather.current.clouds}%</p>}    */}

                
            </div>
        )
    }
}


export default CurrentWeather;