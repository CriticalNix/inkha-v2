var navLink = 'https://doge-dice.com/';

function navigateAway() {
	chrome.tabs.create({url: navLink});
}
chrome.browserAction.onClicked.addListener(navigateAway);