import {
	AUTO_SCROLL_ON_MESSAGE,
	AUTO_SCROLL_OFF_MESSAGE,
	SHOW_AD_ON_MESSAGE,
	SHOW_AD_OFF_MESSAGE,
	AUTO_COLLECT,
} from "../common/constant";
chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
	if (
		request.query === AUTO_SCROLL_ON_MESSAGE ||
		request.query === AUTO_SCROLL_OFF_MESSAGE ||
		request.query === SHOW_AD_OFF_MESSAGE ||
		request.query === SHOW_AD_ON_MESSAGE ||
		request.query === AUTO_COLLECT
	) {
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, request);
		});
	}
});

// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
// 	if (changeInfo.status == "complete") {
// 		chrome.scripting.executeScript({
// 			files: ["inject.js"],
// 			target: { tabId: tab.id },
// 		});
// 	}
// });
