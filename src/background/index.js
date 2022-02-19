
import {AUTO_SCROLL_ON_MESSAGE, AUTO_SCROLL_OFF_MESSAGE, SHOW_AD_ON_MESSAGE, SHOW_AD_OFF_MESSAGE} from "../common/constant";
chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
    if(request.query === AUTO_SCROLL_ON_MESSAGE ||request.query === AUTO_SCROLL_OFF_MESSAGE ||request.query === SHOW_AD_OFF_MESSAGE ||request.query === SHOW_AD_ON_MESSAGE ) {
        chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, request);
        })
    }
});