import React, {Component} from 'react';
import axios from 'axios';
import classes from '../src/style/CurrentWeather.css';

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
                {this.state.weather.city.name && <p className='currentWeather__city'>City: {this.state.weather.city.name}</p>} {/*City Name*/}

                {this.state.weather.current.temperature && <p className='currentWeather__temperature'>Temperature: {this.state.weather.current.temperature} &deg;C</p>}

                {this.state.weather.current.humidity && <p className='currentWeather__humidity'>Humidity: {this.state.weather.current.pressure} hpA</p>} {/*Humidity*/}

                {this.state.weather.current.pressure && <p className='currentWeather__pressure'>Pressure: {this.state.weather.current.pressure}%</p>} {/*Pressure*/}

                {this.state.weather.current.description && <p className='currentWeather__description'>Description: {this.state.weather.current.description}</p>}    {/*Description*/}

                {this.state.weather.current.windSpeed && <p className='currentWeather__windSpeed'>WindSpeed: {this.state.weather.current.windSpeed}mps</p>}  {/*windSpeed*/}

                {this.state.weather.current.clouds && <p className='currentWeather__clouds'>Clouds: {this.state.weather.current.clouds}%</p>}   {/*clouds*/}

                {this.state.weather.current.icon && <p className='currentWeather__icon'>Icon: <img src={this.state.weather.current.icon} /></p>} {/*icon*/}
            </div>
        )
    }
}


export default CurrentWeather;