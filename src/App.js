/*global chrome*/
import React, { Component } from 'react';
import URLInfoContainer from "./components/URLInfoContainer"
import TrafficContainer from "./components/TrafficContainer"
import { getCurrentTab } from "./common/Utils";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_url : "",
            traffic: {}
        };
    }

    componentDidMount() {
        getCurrentTab((tab) => {
            chrome.runtime.sendMessage({type: 'popupInit', tabId: tab.id}, (response) => {
                if (response) {
                    this.setState({
                        current_url : tab.url,
                        traffic: Object.assign(this.state.traffic, response)
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
                <TrafficContainer traffic={this.state.traffic}/>
            </p>
          </div>
        );
    }
}

export default App;