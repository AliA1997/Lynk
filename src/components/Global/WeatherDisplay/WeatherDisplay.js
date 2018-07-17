import React, { Component } from 'react';
//Import Typography from material-ui
import Typography from '@material-ui/core/Typography';
import './WeatherDisplay.css';

export default class WeatherDisplay extends Component {
    render() {
        return (
            <div className='weather-display-div'>
                <Typography>Display the Weather!!</Typography>
            </div>
        );
    }
}