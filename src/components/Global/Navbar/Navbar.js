import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.css';
import { Avatar } from '../../../../node_modules/@material-ui/core';

//Define inline styles for the component
// const styles = {
//     root: {
//         flexGrow: 1,
//     },
//     flex: {
//         flex: 1,
//     },
//     menuButton: {
//         marginLeft: -12,
//         marginRight: 20,
//     },

// }

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            auth: true,
            anchorEl: null
        }
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = () => {
    this.setState({ anchorEl: null });
    }
    render() {
        const { auth, anchorEl } = this.state;
        const { user } = this.props;
        const open = Boolean(anchorEl);
        return (
            <div className='navbar'>
                <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        <Link to='/' className='nav-link'>
                            Lynkup
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/dashboard' className='nav-link'>
                            My Dashboard
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/groups'  className='nav-link'>
                            Groups
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/events' className='nav-link'>
                            Events
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/about' className='nav-link'>
                            About
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/contact' className='nav-link'>
                            Contact
                        </Link>
                    </Typography>
                    {auth && (
                    <div>
                        <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        >
                        {user && user.profile_picture ? <Avatar src={user.profile_picture} /> : <AccountCircle />}
                        </IconButton>
                        <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                        >
                        {/* When the menu item is clicked the menu is closed! */}
                        <MenuItem onClick={() => this.handleClose()}>
                            <Link to='/dashboard/create_group' className='nav-sublink'>Create Group</Link>
                        </MenuItem>
                        <MenuItem onClick={() => this.handleClose()} >
                            <Link to='/dashboard/create_event' className='nav-sublink'>Create Event</Link>
                        </MenuItem>
                        </Menu>
                    </div>
                    )}
                </Toolbar>
                </AppBar>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Navbar);