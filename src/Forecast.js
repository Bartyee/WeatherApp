import React, {Component} from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment/locale/pl';
import 'moment-timezone';
import Slider from "react-slick";

class SimpleSlider extends React.Component {
    render() {
      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
      return (
        <Slider {...settings}>
        </Slider>
      );
    }
  }




const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";

class Forecast extends React.Component {
    
    state = {
        cityName: this.props.cityName,
        cityCountry: this.props.cityCountry,
        forecast: undefined,
        renderForecast: false,
        icon: 'http://openweathermap.org/img/w/'
        
    }

    componentWillReceiveProps(nextProps){
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${nextProps.cityName},${nextProps.cityCountry}&appid=${API_KEY}&units=metric`)

            .then(res => {
                const data = res.data;
                console.log(data);
                this.formatWeatherData(data);
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

        return(
            
            <div>
            
                {this.state.renderForecast && this.state.forecast.map(function(day,index){
                    return(
                        <div>
                        <h1 key={index}><Moment locale='pl' format='dddd'>{day[0].dt_txt.split(' ')[0]}</Moment></h1>
                        <div>
                        
                        
                            {day.map(function(hourProperty,index){
                                
                                return(
                                    
                                    
                                    <div key={index}>
                                        
                                        <p>Hour: {hourProperty.dt_txt.split(' ')[1]}</p>
                                        <p>Temperature: {hourProperty.main.temp}</p>
                                        <p>Humidity: {hourProperty.main.humidity}</p>
                                        <p>Pressure: {hourProperty.main.pressure}</p>
                                        <p>WindSpeed: {hourProperty.wind.speed}</p>
                                        <p>Humidity: {hourProperty.main.humidity}</p>
                                        <img src={'http://openweathermap.org/img/w/' + hourProperty.weather[0].icon + '.png'} />
                                        <hr />
                                    </div>
                                    
                                    

                                )
                            })}
                            
                            </div>
                        </div>
                        
                        
                        
                        
                    )
                    

                    
                })}
                
                
            </div>
            
        )
    }

    

  
}

export default Forecast;