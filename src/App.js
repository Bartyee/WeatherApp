import React,{Component  } from "react";
import FormComponent from "./Form.js";
import axios from 'axios';
import CurrentWeather from "./CurrentWeather.js";


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
                <FormComponent handleSubmit={this.handleSubmit} />
                <CurrentWeather cityName={this.state.cityName} cityCountry={this.state.cityCountry}/>
                {/* <CurrentWeather cityName={this.state.cityName}/> */}
            </div>
        )
    }

}

export default App;