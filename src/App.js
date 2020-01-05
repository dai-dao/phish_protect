/*global chrome*/
import React, { Component } from 'react';
import URLInfoContainer from "./components/URLInfoContainer"
// import TrafficContainer from "./components/TrafficContainer"
import { getCurrentTab } from "./common/Utils";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_url : "",
            traffic: {},
            current_url_status : "",
        };
    }

    componentDidMount() {
        getCurrentTab((tab, url_status_response) => {
            chrome.runtime.sendMessage({type: 'popupInit', tabId: tab.id}, (response) => {
                if (response) {
                    this.setState({
                        current_url : tab.url,
                        traffic: Object.assign(this.state.traffic, response),
                        current_url_status : url_status_response.data.hasOwnProperty("matches") ? "Malicious" : "Safe"
                    });
                }
            });
        });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Phish Protection</h1>
            </header>
            <p className="App-intro">
                <URLInfoContainer current_url={this.state.current_url}/>
                <p>Google Safe Browing check: {this.state.current_url_status}</p>
                {/* <TrafficContainer traffic={this.state.traffic}/> */}
            </p>
          </div>
        );
    }
}

export default App;