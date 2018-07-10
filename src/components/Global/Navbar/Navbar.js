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
import './Nav.css';

//Define inline styles for the component
const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
}

export default class  extends Component {
    constructor() {
        super();
        this.state = {
            auth: true,
            anchorEl: null
        }
    }
    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    render() {
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">
                        <Link to='/'>
                            Lynk
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/dashboard'>
                            My Dashboard
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/groups'>
                            Groups
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/events'>
                            Events
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/about'>
                            About
                        </Link>
                    </Typography>
                    <Typography variant="title" color="inherit">
                        <Link to='/contact'>
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
                        <AccountCircle />
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
                        <MenuItem onClick={() => this.handleClose()}>Profile</MenuItem>
                        <MenuItem onClick={() => this.handleClose()}>My account</MenuItem>
                        </Menu>
                    </div>
                    )}
                </Toolbar>
                </AppBar>
        </div>
        );
    }
}