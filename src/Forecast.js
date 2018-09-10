import React, {Component} from 'react'
import axios from 'axios'
import Moment from 'react-moment';
import 'moment/locale/pl';
import 'moment-timezone';



const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";

class Forecast extends React.Component {
    
    state = {
        cityName: this.props.cityName,
        cityCountry: this.props.cityCountry,
        forecast: undefined,
        renderForecast: false
        
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

    
    formatDayData = (string) => {
        const days = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];

    }
    
    render(){

        return(
            <div>
                {this.state.renderForecast && this.state.forecast.map(function(day,index){
                    return(
                        <div>
                        <h1 key={index}><Moment locale='pl' format='dddd'>{day[0].dt_txt.split(' ')[0]}</Moment></h1>
                        {day.map(function(hour,index){
                            return(
                                <div key={index}>
                                    <p>{hour.dt_txt.split(' ')[1]}</p>
                                    <p>{hour.main.temp}</p>

                                </div>
                                
                            )
                            
                        })}
                        </div>
                    )
                    
                    
                })}
                
                
            </div>
        )
    }

    

  
}

export default Forecast;