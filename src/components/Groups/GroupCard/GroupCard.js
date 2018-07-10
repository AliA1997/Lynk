import React, { Component } from 'react';
import './GroupCard.css'

const GroupCard = (props) => {
     const{ group_name, group_description, group_members, group_admin } = props;
        return (
             <div>
                 <div>

                     {/*Displaying the group_name and group_description from props */}
                     <p>Group Name:</p>
                     {group_name}
                     <p>Group Description:</p>
                     {group_description}
                 </div>
             </div>
        );
    
}