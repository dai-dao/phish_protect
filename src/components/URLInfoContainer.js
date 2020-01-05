import React, { Component } from 'react';


export default class URLInfoContainer extends Component {
    static renderURLInfo(url_info) {
        if (url_info) {
            return(<p>{url_info}</p>)
        }
        return '';
    }

    render() {
        return (
           URLInfoContainer.renderURLInfo(this.props.current_url)
        );
    }
}