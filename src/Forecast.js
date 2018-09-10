import React, {Component} from 'react'
import axios from 'axios'
import Moment from 'react-moment';
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

    
    

    
    render(){

        return(
            <div>
                {this.state.renderForecast && this.state.forecast.map(function(item,i){
                    console.log('test');
                    return(
                        <div key={i}>
                            {item.map(function(itemm, o){
                                return(
                                    <div key={o}>
                                        <li>{itemm.dt_txt.split(' ')[0]}</li>
                                    </div>
                                    
                                    
                                )
                            })}
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }

    

  
}

export default Forecast;