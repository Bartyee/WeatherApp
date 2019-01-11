import React, {Component} from 'react';
import axios from 'axios';
import 'moment/locale/pl';
import 'moment-timezone';
import classes from '../style/CurrentWeather.css';
import iconHumidity from "../img/015-humidity.png";
import iconPressure from "../img/003-moon.png";
import iconWindSpeed from "../img/014-wind-sign.png";
import iconClouds from "../img/030-cloudy.png";

import ReactTooltip from 'react-tooltip';

// By default, the tooltip has no style.


const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";

class CurrentWeather extends Component {
    
    state = {
        cityName: this.props.cityName,
        cityCountry: this.props.cityCountry,
        showWeather: false,

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
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${nextProps.cityName},${nextProps.cityCountry}&appid=${API_KEY}&units=metric`)
        
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
            showWeather: true,

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
                   icon: 'https://openweathermap.org/img/w/' + this.state.currentWeather.weather[0].icon + '.png'
                   
                }
            }
        })
    }

    render(){
        if(this.state.showWeather)
        {
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
                    <div className='cityInfo-right__tempAnddetails'>
                        
                        <div className='cityInfo-right__tempAnddetails--temp'>
                        {this.state.weather.current.temperature && <p>{this.state.weather.current.temperature} &deg;C</p>}
                        </div>
                        
                    
                        <div className='cityInfo-right__tempAnddetails__details'>
                        
                            <div data-tip data-for='humidity' className='cityInfo-right__tempAnddetails__details--humidity tempAnddetails__details'>
                                <ReactTooltip id='humidity'>
                                    <span>Humidity</span>
                                </ReactTooltip>
                                {this.state.weather.current.humidity && <div className='cityInfo-right__tempAnddetails__details--element'><img src={iconHumidity} />  <p>{this.state.weather.current.humidity} %</p></div>}
                            </div>
                            
                        
                        
                           
                            
                            <div data-tip data-for='pressure' className='cityInfo-right__tempAnddetails__details--pressure tempAnddetails__details'>
                                <ReactTooltip id='pressure'>
                                    <span>Pressure</span>
                                </ReactTooltip>
                                {this.state.weather.current.pressure && <div className='cityInfo-right__tempAnddetails__details--element'><img src={iconPressure} />  <p>{this.state.weather.current.pressure} hPa</p></div>}                    
                            </div>
                            <div data-tip data-for='windSpeed' className='cityInfo-right__tempAnddetails__details--windSpeed tempAnddetails__details'>
                                <ReactTooltip id='windSpeed'>
                                    <span>Wind Speed</span>
                                </ReactTooltip>
                                {this.state.weather.current.windSpeed && <div className='cityInfo-right__tempAnddetails__details--element'><img src={iconWindSpeed} />  <p>{this.state.weather.current.windSpeed} mps</p></div>}
                            </div>
                            <div data-tip data-for='clouds' className='cityInfo-right__tempAnddetails__details--clouds tempAnddetails__details'>
                                <ReactTooltip id='clouds'>
                                    <span>Clouds</span>
                                </ReactTooltip>
                                {iconClouds && <div className='cityInfo-right__tempAnddetails__details--element'><img src={iconClouds} />  <p>{this.state.weather.current.clouds} %</p></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
            
        )
        }
        else{
            return null
        }
        
    
    }
}


export default CurrentWeather;