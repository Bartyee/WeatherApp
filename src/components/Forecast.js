import React, {Component} from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import classes from '../style/Forecast.css'
import 'moment-timezone';
import Swiper from 'react-id-swiper';



const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";



class Forecast extends React.Component {
    
    state = {
        cityName: this.props.cityName,
        cityCountry: this.props.cityCountry,
        forecast: undefined,
        renderForecast: false,
        icon: 'https://openweathermap.org/img/w/'
        
    }

    

    componentWillReceiveProps(nextProps){
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${nextProps.cityName},${nextProps.cityCountry}&appid=${API_KEY}&units=metric`)

            .then(res => {
                const data = res.data;
                console.log(data);
                this.formatWeatherData(data);
                
                this.setState({
                    ...this.state,
                    renderForecast: true
                })
            })
    }

    formatWeatherData = data => {

        const forecastArr = [];

        let tempArr = [];
        
        

        data.list.map(item => {
            if(tempArr.length === 0){
                tempArr.push(item)
            }
            else if(tempArr[0].dt_txt.split(" ")[0] === item.dt_txt.split(" ")[0]){
                tempArr.push(item)
            }
            else{
                forecastArr.push(tempArr)
                tempArr = [];
                tempArr.push(item)
            }

            this.setState({
                ...this.state,
                forecast: forecastArr,
                renderForecast: true
                
            })
            
        })
    }

    
    render(){
        
        
        const params = {
            spaceBetween: 30,
            slidesPerView: 1,
            containerClass: classes.hourInDay,
            autoplay: {
                delay: 3500,
            },
            breakpoints: {
                    800: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 5
                    },
            },
            grabCursor: true

        }
        
        if(this.state.renderForecast != false)
        {
            return(
            
                <div className='forecastWeather w3-animate-top'>
    
                    
                    
                    {this.state.renderForecast && this.state.forecast.map(function(day,index){
                        
                        return(
                            
                            
                            <div className='dayInWeek' key={index}>
                        
                            <h1 className='nameOfDay'><Moment locale='en' format='dddd'>{day[0].dt_txt.split(' ')[0]}</Moment></h1>
                            
                            <Swiper {...params}>
                            <div className='hourInDay'>
                            
                            
                                {day.map(function(hourProperty,index){
                                    
                                    return(
                                        
                                        
                                        <div className='hourInDay-all' key={index}>
                                            
                                            <h3>Hour:</h3><p><span>{hourProperty.dt_txt.split(' ')[1]}</span></p>
                                            <h3>Temperature:</h3><p>{hourProperty.main.temp} &deg;C</p>
                                            <h3>Humidity:</h3><p>{hourProperty.main.humidity} %</p>
                                            <h3>Pressure:</h3><p>{hourProperty.main.pressure} hPa</p>
                                            <h3>Speed:</h3><p>{hourProperty.wind.speed} mps</p>
                                            <img src={'https://openweathermap.org/img/w/' + hourProperty.weather[0].icon + '.png'} />
                                            <hr />
                                        </div>
                                        
                                        
    
                                    )
                                    
                                })}
                            
                                </div>
                                </Swiper>
                            </div>
    
                           
                            
                        )
                        
    
                        
                    })}
                    
                    
                    
                    
                </div>
                
            )
        }
        else{
            return null;
        }
        
    }

    

  
}

export default Forecast;