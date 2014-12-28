var navLink = 'https://just-dice.com/';

function navigateAway() {
	chrome.tabs.create({url: navLink});
}
chrome.browserAction.onClicked.addListener(navigateAway);