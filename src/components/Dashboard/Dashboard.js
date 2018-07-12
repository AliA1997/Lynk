import React, { Component } from 'react';

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
            <div>
                <h1>Dashboard</h1>
                <div>
                    <div className='dashboard-event-form-div'>
                    </div>
                    <div className='dashboard-group-form-div'>
                        
                    </div>
                </div>
                <div>
                    <button>

                    </button>
                </div>
            </div>
        );
    }
}

