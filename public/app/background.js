const networkFilters = {
    urls: [
        "http://*/*",
        "https://*/*"
    ]
};
const tabStorage = {};


chrome.webRequest.onBeforeRequest.addListener((details) => {
    const { tabId, requestId } = details;
    if (!tabStorage.hasOwnProperty(tabId)) {
        return;
    }
    tabStorage[tabId].requests[requestId] = {
        requestId: requestId,
        url: details.url,
    };
    console.log(tabStorage[tabId].requests[requestId]);
}, networkFilters);


// If a tab is activated, clear out exising tab data if exists
chrome.tabs.onActivated.addListener((tab) => {
    const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
    if (!tabStorage.hasOwnProperty(tabId)) {
        tabStorage[tabId] = {
            id: tabId,
            requests: {},
        };
    }
});


// If a tab is remove, clear out tab data
chrome.tabs.onRemoved.addListener((tab) => {
    const tabId = tab.tabId;
    if (!tabStorage.hasOwnProperty(tabId)) {
        return;
    }
    tabStorage[tabId] = null;
});


chrome.runtime.onMessage.addListener((msg, sender, response) => {
    switch (msg.type) {
        case 'popupInit':
            response(tabStorage[msg.tabId]);
            break;
        default:
            response('unknown request');
            break;
    }
});