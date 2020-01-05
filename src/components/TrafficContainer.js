import React, { Component } from 'react';


export default class TrafficContainer extends Component {
    static renderNetworkTrafficData(requests) {
        if (requests) {
            return Object.keys(requests).map((key) => {
                return (<li>{`${requests[key].url}`}</li>);
            });
        }
        return '';
    }

    render() {
        return (
            <ul>
           {TrafficContainer.renderNetworkTrafficData(this.props.traffic.requests)}
            </ul>
        );
    }
}