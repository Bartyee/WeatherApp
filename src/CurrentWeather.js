import React, {Component} from 'react';
import axios from 'axios';

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
    }

    weatherDataFormat = () => {
        this.setState({

            ...this.state,
            // weather: {
            //     city: {
            //         name: this.state.currentWeather.city.name,
            //         id: this.state.currentWeather.id
            //     },
            //     current: { TO JEST DO FORECAST CZYLI DO 5 DNIOWEJ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            //         humidity: this.state.currentWeather.list.humidity,
                    
            //         // temperature://this.state.currentWeather.list[0].temperature,
            //         // description: //this.state.currentWeather.weather[0].description,
            //         // windSpeed: //this.state.currentWeather.wind.speed,
            //         // clouds: //this.state.currentWeather.clouds.all
            //     }
            // }

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
            <div>
                {this.state.weather.city.name && <p>City: {this.state.weather.city.name}</p>} {/*City Name*/}

                {this.state.weather.current.temperature && <p>Temperature: {this.state.weather.current.temperature}</p>}

                {this.state.weather.current.humidity && <p>Humidity: {this.state.weather.current.pressure} hpA</p>} {/*Humidity*/}

                {this.state.weather.current.pressure && <p>Pressure: {this.state.weather.current.pressure}%</p>} {/*Pressure*/}

                {this.state.weather.current.description && <p>Description: {this.state.weather.current.description}</p>}    {/*Description*/}

                {this.state.weather.current.windSpeed && <p>WindSpeed: {this.state.weather.current.windSpeed}mps</p>}  {/*windSpeed*/}

                {this.state.weather.current.clouds && <p>Clouds: {this.state.weather.current.clouds}%</p>}   {/*clouds*/}

                {this.state.weather.current.icon && <p>Icon: <img src={this.state.weather.current.icon} /></p>} {/*icon*/}
            </div>
        )
    }
}


export default CurrentWeather;