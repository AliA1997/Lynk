import React, { Component } from 'react';
import axios from 'axios';
//Import Typography from material-ui
// import Typography from '@material-ui/core/Typography';
import './WeatherDisplay.css';

class WeatherDisplay extends Component {
    constructor(props){
        super(props)
        this.state= {
            lat: null,
            long: null,
            temp: '',
            summary: '',
            place: ''
        }
    }

    componentDidMount(){
        const {lat, long} = this.state
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos => this.setState({lat: pos.coords.latitude, long: pos.coords.longitude})))
        } else {
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=+Phoenix,+AZ&key=${process.env.REACT_APP_GOOGLE_KEY}`)
            .then(res => { 
                this.setState({
                    lat: res.data.results[0].geometry.location.lat,
                    long: res.data.results[0].geometry.location.lng
                })
                //Console log the latitude and longitude from the response to check if it has data.
                console.log('lat-------------------', res.data.results[0].geometry.location.lat)
                console.log('long--------------', res.data.results[0].geometry.location.lng)
            }).catch(err => console.log('Google Geolocation Error---------', err));
        }

        setTimeout(() => {
            // if (lat && long ){
                axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.REACT_APP_SKY_KEY}/${lat},${long}`).then(res => {
                    console.log('somethings here', res)
                    this.setState({
                        place: res.data.timezone,
                        temp: res.data.currently.temperature,
                        summary: res.data.currently.summary,
                    })
                }).catch(error => {
                    console.log('theres an error here in the weather', error)
                })
            // } else {
            //     return;
            // }
        }, 100);
    }

    componentWillUnmount() {
        clearTimeout();
    }
    render() {
        return (
            <div className='weather-display-div'>
                <div>
                    {this.state.place}
                    <h2>{this.state.summary}</h2>
                </div>
                <div className='temp'>
                    <h1>{this.state.temp}</h1>
                </div>
                {/* <Typography>Display the Weather!!</Typography> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    userCoords: state.userCoords
};

export default connect (mapStateToProps)(WeatherDisplay);