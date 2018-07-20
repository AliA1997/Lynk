import React, { Component } from 'react';
import './Dashboard.css'
import Groups from '../Groups/Groups';

///Dashboard components.
export default class Dashboard extends Component {
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
        
        return (
            <div className='dashboard-className'>
                <h1>Dashboard</h1>
                <div>
                    <div className='dashboard-event-form-div'>
                    </div>
                    <div className='dashboard-group-form-div'>
                        
                    </div>
                </div>
                <Groups isDashboard={true} />
                <div>
                    <button>

                    </button>
                </div>
            </div>
        );
    }
}

