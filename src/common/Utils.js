/*global chrome*/
const axios = require('axios');
var CONFIG = require('./config.json');
var key = CONFIG.key


export function getCurrentTab(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
    (tabs) => {
        callLookupAPI(tabs[0], callback)
    });
}


function callLookupAPI(tab, callback) {
    const configHeaders = {
        "Content-Type": "application/json",
    };
    axios({
        url: `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${key}`,
        method: 'post',
        data: 
            {
                "client": {
                  "clientId": "dd.inc",
                  "clientVersion": "0.0.1"
                },
                "threatInfo": {
                  "threatTypes":      ["MALWARE", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION"],
                  "platformTypes":    ["ANY_PLATFORM"],
                  "threatEntryTypes": ["URL", "EXECUTABLE"],
                  "threatEntries": [
                    {"url": tab.url},
                  ]
                }
            }
        ,
        headers: configHeaders
      })
    .then(function (response) {
        callback(tab, response)
    })
    .catch(function (error) {
        console.log(error);
    });
}