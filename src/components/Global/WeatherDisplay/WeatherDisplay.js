import React, { Component } from 'react';
import axios from 'axios';
//Import Typography from material-ui
import Typography from '@material-ui/core/Typography';
import './WeatherDisplay.css';

export default class WeatherDisplay extends Component {
    constructor(props){
        super(props)
        this.state= {
            lat: null,
            long: null
        }
    }

    componentDidMount(){
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=+Phoenix,+AZ&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(res => { 
            this.setState({
                lat: res.data.results[0].geometry.location.lat,
                long: res.data.results[0].geometry.location.lng
            })
            const {lat, long} = this.state
            if (lat && long ){
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_SKY_KEY}/${lat},${long}`).then(res => {
                    console.log('somethings here', res)
                }).catch(error => {
                    console.log('theres an error here in the weather', error)
                })
            } else {
                return
            }
            //Console log the latitude and longitude from the response to check if it has data.
            console.log('lat-------------------', res.data.results[0].geometry.location.lat)
            console.log('long--------------', res.data.results[0].geometry.location.lng)
        }).catch(err => console.log('Google Geolocation Error---------', err));
    }


    render() {
        return (
            <div className='weather-display-div'>
                <div>
                    <label></label>
                </div>
                {/* <Typography>Display the Weather!!</Typography> */}
            </div>
        );
    }
}