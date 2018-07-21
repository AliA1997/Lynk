import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import MdGroup from 'react-icons/lib/md/group';
import MdList from 'react-icons/lib/md/list';
import MdHome from 'react-icons/lib/md/home';
import MdEventSeat from 'react-icons/lib/md/event-seat';
import MdEmail from 'react-icons/lib/md/email';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';
import GoDashboard from 'react-icons/lib/go/dashboard';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navbar from '../Navbar/Navbar';
// import GroupCarousel from '../GroupCarousel/GroupCarousel';
import WeatherDisplay from '../WeatherDisplay/WeatherDisplay';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import './Header.css';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            hamburgerClicked: false,
            dashboardClicked: false,
            homeClicked: false,
            groupsClicked: false,
            eventsClicked: false,
            aboutClicked: false,
            contactClicked: false,
        }
    }
    componentDidMount() {
        //Do an axios request to the google api.
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=+Phoenix,+AZ&key=${process.env.REACT_APP_GOOGLE_KEY}`)
        .then(res => {
            //Console log the latitude and longitude from the response to check if it has data.
            // console.log('lat-------------------', res.data.results[0].geometry.location.lat)
            // console.log('long--------------', res.data.results[0].geometry.location.lng)
            
        }).catch(err => console.log('Google Geolocation Error---------', err));
    }
    elementSelect(elem) {
        if(elem === 'home') {
            this.setState({
                homeClicked: !this.state.homeClicked,
                dashboardClicked: false,
                groupsClicked: false,
                eventsClicked: false,
                aboutClicked: false,
                contactClicked: false,
            });
        } else if(elem === 'dashboard') {
            this.setState({
                dashboardClicked: !this.state.dashboardClicked,
                homeClicked: false,
                groupsClicked: false,
                eventsClicked: false,
                aboutClicked: false,
                contactClicked: false,
            }); 
        } else if(elem === 'group') {
            this.setState({
                groupsClicked: !this.state.groupsClicked,
                homeClicked: false,
                dashboardClicked: false,
                eventsClicked: false,
                aboutClicked: false,
                contactClicked: false,
            }); 
        } else if(elem === 'event') {
            this.setState({
                eventsClicked: !this.state.eventsClicked,
                homeClicked: false,
                dashboardClicked: false,
                groupsClicked: false,
                aboutClicked: false,
                contactClicked: false,
            });
        } else if(elem === 'about') {
            this.setState({
                aboutClicked: !this.state.aboutClicked,
                homeClicked: false,
                dashboardClicked: false,                
                groupsClicked: false,
                eventsClicked: false,
                contactClicked: false,
            });
        } else {
            this.setState({
                contactClicked: !this.state.contactClicked,
                homeClicked: false,
                dashboardClicked: false,
                groupsClicked: false,
                eventsClicked: false,
                aboutClicked: false,
            });
        }
    }
    render() {
        //Destructure the user props from the reducer from this.props;
        const { user } = this.props;
        //Destructure the hamburgerClicked from this.state;
        const { hamburgerClicked, dashboardClicked, homeClicked, groupsClicked, eventsClicked, aboutClicked, contactClicked } = this.state;
        return (
            <div>
                <div className='desktop'>
                    <Typography className='header-label' style={{fontSize: '3em'}}>Lynkup</Typography>
                    <Navbar />
                </div>
                <div className='mobile'>
                    <Button onClick={() => this.setState({hamburgerClicked: !this.state.hamburgerClicked})} 
                    style={{zIndex: 6}}>
                      <MdList style={{fontSize: '3em'}} />
                    </Button>
                    <Typography className='header-label' style={{fontSize: '2.5em'}} >
                        Lynkup
                    </Typography>
                    {user && <Avatar src={user.profile_picture} alt={user.username + ' picture!'}/>}
                    <div>
                        <div style={{display: hamburgerClicked ? 'grid' : 'none'}} className="mobile mobile-navbar">
                            <Button onClick={() => this.elementSelect('dashboard')} id="dashboard"
                            style={{zIndex: 6, background: dashboardClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1',  gridRow: '2/2', height: '100%', width: '100%'}}>
                                <GoDashboard style={{fontSize: '3em'}}/>
                            </Button>
                            <Typography style={{display: dashboardClicked ?'flex' : 'none', 
                            gridRow: '2/2', gridColumn: '2/4', width: '100%', height: '100%'}} id='dashboard-label'>
                                <Link to='/dashboard' className='mobile-nav-link'>
                                    Dashboard
                                </Link>
                            </Typography>
                            <Button onClick={() => this.elementSelect('home')} id="home" 
                            style={{zIndex: 6, background: homeClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1', gridRow: '3/3', height: '100%', width: '100%'}}>
                                <MdHome style={{fontSize: '3em'}} />
                            </Button>
                            <Typography style={{display: homeClicked ?'flex' : 'none', 
                            gridRow: '3/3', gridColumn: '2/4', width: '100%', height: '100%'}} id='home-label'>
                                <Link to='/' className='mobile-nav-link'>
                                    Home
                                </Link>    
                            </Typography>
                            <Button onClick={() => this.elementSelect('group')} id="group"
                            style={{zIndex: 6, background: groupsClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1', gridRow: '4/4', height: '100%', width: '100%'}}>
                                <MdGroup style={{fontSize: '3em'}} />
                            </Button>
                            <Typography style={{display: groupsClicked ?'flex' : 'none', 
                            gridRow: '4/4', gridColumn: '2/4', width: '100%', height: '100%'}} id='group-label'>
                                <Link to='/groups' className='mobile-nav-link'>
                                    Groups
                                </Link>
                            </Typography>
                            <Button onClick={() => this.elementSelect('event')} id="event"
                            style={{zIndex: 6, background: eventsClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1',  gridRow: '5/5', height: '100%', width: '100%'}}>
                                <MdEventSeat style={{fontSize: '3em'}} />
                            </Button>
                            <Typography style={{display: eventsClicked ?'flex' : 'none', 
                            gridRow: '5/5', gridColumn: '2/4', width: '100%', height: '100%'}} id='event-label'>
                                <Link to='/events' className='mobile-nav-link'>
                                    Events
                                </Link>
                            </Typography>
                            <Button onClick={() => this.elementSelect('about')} id="about"
                            style={{zIndex: 6, background: aboutClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1',  gridRow: '6/6', height: '100%', width: '100%'}}>
                                <FaInfoCircle style={{fontSize: '3em'}} />
                            </Button>
                            <Typography style={{display: aboutClicked ?'flex' : 'none', 
                            gridRow: '6/6', gridColumn: '2/4', width: '100%', height: '100%'}} id='about-label'>
                                <Link to='/about' className='mobile-nav-link'>
                                    About
                                </Link>
                            </Typography>
                            <Button onClick={() => this.elementSelect('contact')} id="contact"
                            style={{zIndex: 6, background: contactClicked ?  '#fff' : 'transparent',
                            border: '2px solid #fff', gridColumn: '1/1',  gridRow: '7/7', height: '100%', width: '100%'}}>
                                <MdEmail style={{fontSize: '3em'}}/>
                            </Button>
                            <Typography style={{display: contactClicked ?'flex' : 'none', 
                            gridRow: '7/7', gridColumn: '2/4', width: '100%', height: '100%'}} id='contact-label'>
                                <Link to='/contact' className='mobile-nav-link'>
                                    Contact
                                </Link>
                            </Typography>
                            <WeatherDisplay />
                        </div>
                    </div>
                    {/* <GroupCarousel groups={user && user.groups} /> */}
                </div>
                <hr/>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default withRouter(connect(mapStateToProps)(Header));

