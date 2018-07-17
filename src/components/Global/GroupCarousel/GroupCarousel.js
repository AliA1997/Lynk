import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import './GroupCarousel.css';

class GroupCarousel extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            displayGroups: []
        }
    }
    componentDidMount() {
        const { currentIndex } = this.state;
        const { groups } = this.props;
        let arr = [];
        if(groups) {
            console.log('groups-----------', groups);
            for(let i = 0; i < currentIndex + 5; i++) {
                if(groups[i]) {
                    arr.push(groups[i])
                } else {
                    this.setState({displayArray: arr});
                    break;   
                }
            }
        }
    }
    render() {
        // const { groups } = this.props;
        const { displayGroups } = this.state;
        return (
            <div className='slide-container'>
                {displayGroups && displayGroups.map((group, i) => <Avatar key={i} image={group.group_image} alt={group.group_name} />)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(GroupCarousel)