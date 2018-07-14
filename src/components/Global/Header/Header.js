import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import MdGroup from 'react-icons/lib/md/group';
import MdList from 'react-icons/lib/md/list';
import MdHome from 'react-icons/lib/md/home';
import MdEventSeat from 'react-icons/lib/md/event-seat';
import MdEmail from 'react-icons/lib/md/email';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Navbar from '../Navbar/Navbar';
import './Header.css';
import { connect } from 'react-redux';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            hamburgerClicked: false
        }
    }
    elementSelect(elem) {
        let elementSelected  = document.getElementById(elem);
        let activeElement = document.querySelector('.active');
        if(activeElement) {
                activeElement.classList.remove('active');
        }
        console.log('elementSelected-----------------', elementSelected);

       if(elementSelected.classList.contains('active')) {
           elementSelected.classList.remove('active');
       } else {
        elementSelected.classList.add('active');
       }
       return;
    
    }
    render() {
        //Destructure the user props from the reducer from this.props;
        const { user } = this.props;
        //Destructure the hamburgerClicked from this.state;
        const { hamburgerClicked } = this.state;
        return (
            <div>
                <div className='desktop'>
                    <Typography className='header-label' style={{fontSize: '3em'}}>Lynkup</Typography>
                    <Navbar />
                    {user && <Avatar src={user.profile_picture} alt={user.username + ' picture!'}/>}
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
                            <Button onClick={() => this.elementSelect('home')} id="home" 
                            style={{zIndex: 6, background: '#fff', border: '2px solid #fff', gridColumn: '1/2', gridRow: '2/2'}}>
                                <MdHome style={{fontSize: '3em'}} />
                            </Button>
                            <Button onClick={() => this.elementSelect('group')} id="group"
                            style={{zIndex: 6, background: '#fff', border: '2px solid #fff', gridColumn: '1/2', gridRow: '3/3'}}>
                                <MdGroup style={{fontSize: '3em'}} />
                            </Button>
                            <Button onClick={() => this.elementSelect('event')} id="event"
                            style={{zIndex: 6, background: '#fff', border: '2px solid #fff', gridColumn: '1/2',  gridRow: '4/4'}}>
                                <MdEventSeat style={{fontSize: '3em'}} />
                            </Button>
                            <Button onClick={() => this.elementSelect('about')} id="about"
                            style={{zIndex: 6, background: '#fff', border: '2px solid #fff', gridColumn: '1/2',  gridRow: '5/5'}}>
                                <FaInfoCircle style={{fontSize: '3em'}} />
                            </Button>
                            <Button onClick={() => this.elementSelect('contact')} id="contact"
                            style={{zIndex: 6, background: '#fff', border: '2px solid #fff', gridColumn: '1/2',  gridRow: '6/6'}}>
                                <MdEmail style={{fontSize: '3em'}}/>
                            </Button>
                        </div>
                    </div>
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
export default connect(mapStateToProps)(Header);

