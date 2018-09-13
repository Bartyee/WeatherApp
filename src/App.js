import React,{Component  } from "react";
import classes from './App.css'
import FormComponent from "./Form.js";
import axios from 'axios';
import CurrentWeather from "./CurrentWeather.js";
import Forecast from "./Forecast.js";
import Header from "./Header.js";



const API_KEY = "b25c40f7f24ed40bbd9add84d8badbd9";

class App extends Component {
    constructor(){
        super();
        this.state = {
            cityName: undefined,
            cityCountry: undefined
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        const cityName = e.target.elements.city.value;
        const cityCountry = e.target.elements.country.value;

        this.setState({
            cityName: cityName,
            cityCountry: cityCountry
        })
    }

    render(){
        return(
            <div className='App'>
                <div className="main">
                    <Header />
                    <FormComponent handleSubmit={this.handleSubmit} />
                    <CurrentWeather cityName={this.state.cityName} cityCountry={this.state.cityCountry}/>
                    <Forecast cityName={this.state.cityName} cityCountry={this.state.cityCountry} />
                </div>
                
            </div>
        )
    }

}

export default App;