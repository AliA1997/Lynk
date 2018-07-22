import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import placeholderImage from '../../../Images/default-placeholder.png';
import { connect } from 'react-redux';
import './GroupCarousel.css';

class GroupCarousel extends Component {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
            displayGroups: [],
            pastFirstSlide: false
        }
    }

    goBack() {
        const { currentIndex } = this.state;
        const { groups } = this.props;
        let arr = []
        if(currentIndex - 5 < 0) {
            this.setState({currentIndex: groups.length, pastFirstSlide: true});
            for(let i = currentIndex; i < currentIndex; i++) {
                if(groups[i]) arr.push(groups[i]);
                console.log(groups[i])
            }
            this.setState({displayGroups: arr});
        } else {
            this.setState({currentIndex: currentIndex - 5, pastFirstSlide: false});
        }

    }
    goForward() {
        const { currentIndex } = this.state;
        const { groups } = this.props;
        let arr = [];
        console.log('groups-----------------', groups);
        if(currentIndex > groups.length) {
            this.setState({currentIndex: 0, pastFirstSlide: false});
        } else {
            this.setState({currentIndex: currentIndex + 5, pastFirstSlide: true});
            for(let i = currentIndex - 5; i < currentIndex; i++) {
                if(groups[i]) arr.push(groups[i]);
            }
            this.setState({displayGroups: arr});
        }
    }
    render() {
        const { groups } = this.props;
        console.log('groups---------------', groups);
        const { displayGroups, pastFirstSlide, currentIndex } = this.state;
        console.log('this.stat.currentIndex', displayGroups)
        console.log('this.state.currentIndex', this.state.currentIndex + 5)
        return (
            <div className='slide-container'>
                <div className='slide-div'>
                    <p onClick={() => this.goBack()}>&#10094;</p>
                    <div className='carousel'>
                        {pastFirstSlide ? displayGroups && displayGroups.length && 
                        displayGroups.map((group, i) => <Avatar key={i} src={group.group_image || placeholderImage} alt={group.group_name} />)
                        : groups && groups.length && 
                        groups.map((group, i) => i + currentIndex  < 5 && <Avatar key={i} src={group.group_image || placeholderImage} alt={group.group_name} />)}
                    </div>
                    <p onClick={() => this.goForward()}>&#10095;</p>
                </div>
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