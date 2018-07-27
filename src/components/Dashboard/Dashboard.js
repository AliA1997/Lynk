import React, { Component } from 'react';
import placeholderImage from '../../Images/default-placeholder.png';
// import GroupCarousel from '../Global/GroupCarousel/GroupCarousel';
import Groups from '../Groups/Groups';
import Events from '../Events/Events';
//Material-UI Components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//React-icons
import IoIosCogOutline from 'react-icons/lib/io/ios-cog-outline';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Dashboard.css'

///Dashboard components.
class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            groupName: '',
            groupDescription: '',
            currentMemberSelected: '',
            groupMembers: [],
            eventName: '',
            eventTopic: '',
            eventDate: '',
            eventLocation: '',
            currentEventAttendeeSelected: '',
            eventAttendeeList: [],
        }
    }

    componentDidMount() {
        const { user } = this.props;
        if(!user) {
            alert('Must Login to access Dashboard');
            this.props.history.push('/login');
        }
    }
    render() {
        const { user } = this.props;
        if(user) {
            return (
                <div className='dashboard-className'>
                    <Typography style={{textAlign: 'center'}}>Dashboard</Typography>
                    <hr />
                    <div className='dashboard-user-container-div'>
                        <div className='dashboard-user-div'>
                            <Avatar className='dashboard-profile-image'
                            src={user.profile_picture || placeholderImage} alt={user.username + ' picture!'} />
                            <div>
                                {user.username && <Typography>{user.username}</Typography>}
                                <Typography>{user.email}</Typography>
                                <Typography>{user.name}</Typography>
                                <Typography>
                                    # Groups a user is part of: {user.groups && user.groups.length}
                                </Typography>
                                <Typography>
                                    # Events a user has went to: {user.events && user.events.length}
                                </Typography>
                            </div>
                        </div>
                        <hr />
                        <IoIosCogOutline className='dashboard-edit-profile-icon'/>
                    </div>
                    <Typography><b>Groups you are part of.</b></Typography>
                    <hr />
                    <Groups isDashboard={true} groupsUserPartOf={true} />
                    <hr />
                    <Typography><b>Groups you run</b></Typography>
                    <hr />
                    <Groups isDashboard={true} groupsUserAdmin={true} />
                    <hr />
                    <Typography><b>Events you are part of.</b></Typography>
                    <hr />
                    <Events isDashboard={true} eventsUserAdmin={true} />
                    <hr />
                    <Typography><b>Events you run</b></Typography>
                    <hr />
                    <Events  isDashboard={true} eventsUserPartOf={true} />
                    <hr />
                    <div>
                        <button>

                        </button>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user 
    };
}

export default withRouter(connect(mapStateToProps)(Dashboard));

