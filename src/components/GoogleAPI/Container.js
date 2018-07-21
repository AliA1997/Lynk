import React, { Component } from 'react';
import Map from './Map';

export class Container extends React.Component {
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
          }
          return (
            <div style={style}>
              <Map google={this.props.google}
                />
            </div>
          )
        if(!this.props.loaded){
            return <div>Loading...</div>
        }
        return (
            <div>Map will go here</div>
        );
    }
}



export default GoogleApiComponent({
    api: REACT_APP_GOOGLE_KEY
})(Container)