import React, { PureComponent } from 'react'
import classes from './style/Header.css';

class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <h1>Weather<span>Finder.</span></h1>
                <p>Your weather in one place ...</p>
            </div>
        )
    }
}

export default Header;