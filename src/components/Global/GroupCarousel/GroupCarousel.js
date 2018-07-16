// import React, { Component } from 'react';
// import Avatar from '@material-ui/core/Avatar';

// export default class GroupCarousel extends Component {
//     constructor() {
//         super();
//         this.state = {
//             indexOfGroup: 5
//         }
//     }
//     rightArrowClick() {
//         this.setState({
//             indexOfGroup: (this.state.indexOfGroup + 5) > this.props.userGroups.length ? 0 : (this.state.indexOfGroup + 5)
//         });
//     }
//     leftArrowClick() {
//         this.setState({
//             indexOfGroup: (this.state.indexOfGroup - 5) < 0 ? 0 : (this.state.indexOfGroup - 5)
//         });
//     }
//     render() {
//         const { userGroups } = this.props;
//         const { indexOfGroup } = this.state; 
//         return (
//             <div>
//                 {userGroups.map(group => i < indexOfGroup ? <Avatar src={group.group_image} alt={group.group_name} /> : null)}
//             </div>
//         );
//     }
// }