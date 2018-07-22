import React, { Component } from 'react';
import placeholderImage from '../../Images/default-placeholder.png';
import Groups from '../Groups/Groups';
//Material-UI Components
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//React-icons
import IoIosCogOutline from 'react-icons/lib/io/ios-cog-outline';
import { connect } from 'react-redux';
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

    
    render() {
        const { user } = this.props;
        return (
            <div className='dashboard-className'>
                <Typography variant='outlined' style={{textAlign: 'center'}}>Dashboard</Typography>
                <hr />
                <div className='dashboard-user-container-div'>
                    <div className='dashboard-user-div'>
                        <Avatar style={{height: '15em', width: '15em'}}
                        src={user.profile_picture || placeholderImage} alt={user.username + ' picture!'} />
                        {user.username && <Typography variant='outlined'>{user.username}</Typography>}
                        <Typography variant='outlined'>{user.email}</Typography>
                        <Typography variant='outlined'>{user.name}</Typography>
                        <Typography variant='outlined'>
                            # Groups a user is part of: {user.groups && user.groups.length}
                        </Typography>
                        <Typography variant='outlined'>
                            # Events a user has went to: {user.events && user.events.length}
                        </Typography>
                    </div>
                    <hr />
                    <IoIosCogOutline style={{fontSize: '5em', widhr: '100%'}} color='primary'/>
                </div>
                <Typography><b>Groups you are part of.</b></Typography>
                <hr />
                <Groups isDashboard={true} groupsUserPartOf={true} />
                <Typography><b>Groups you run</b></Typography>
                <hr />
                <Groups isDashboard={true} groupsUserAdmin={true} />
                <div>
                    <button>

                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user 
    };
}

export default connect(mapStateToProps)(Dashboard);

