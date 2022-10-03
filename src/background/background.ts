import {EXTENSION_ID, getExtensionUrl} from "../utils/utils";
import {Message, MessageType} from "../models/Message";
import Port = chrome.runtime.Port;

/**
 *  helper function, open the tab, check if tab is open, then open the opened tab
 * */
function openTab(filename: any) {
    let tabOpen: boolean = false;
    console.log('Extension Id: ', EXTENSION_ID);
    chrome.windows.getCurrent(function (win) {
        chrome.tabs.query({'windowId': win.id},
            function (tabArray) {
                for (let i in tabArray) {
                    if (tabArray[i].url === getExtensionUrl()) {
                        // @ts-ignore
                        chrome.tabs.update(tabArray[i].id, {
                            active: true
                        });
                        tabOpen = true;
                        break;
                    }
                    tabOpen = false;
                }
                if (!tabOpen) {
                    chrome.tabs.create({
                        url: chrome.runtime.getURL(filename)
                    });
                }
            }
        );
    });
}

/**
 * listener, on click of the extension icon, open the extension a tab
 * */
chrome.action.onClicked.addListener((tab) => {
    openTab("index.html");
});

/**
 * listener, that adds the context menu on the installation of the extension
 * */
chrome.runtime.onInstalled.addListener((details) => {
    createContextMenus();
    chrome.contextMenus.onClicked.addListener((event) => {
        if (event.selectionText) {
            chrome.tts.speak(event.selectionText);
        } else {
            chrome.tts.speak('Bitte selektiere einen gültigen Text.');
        }
    });
});

/**
 * helper function, creates the context menu
 * */
function createContextMenus() {
    chrome.contextMenus.create({
        title: 'Text vorlesen',
        id: `virtual_assistant/menu_1`,
        contexts: ['selection']
    });
}

/**
 * message listener for the communication between the open extension and the content script
 * */
chrome.runtime.onConnect.addListener(function (port: Port) {
    port.onMessage.addListener(function (message: Message, port: Port) {
        if (message.type === MessageType.SETUP_COMMUNICATION) {
            console.log('Communication established');
        } else if (message.type === MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP) {
            getActiveTab().then(youtubeHomeTab => {
                if (isYoutubeHomePage(youtubeHomeTab.url as string)) {
                    chrome.tabs.sendMessage(youtubeHomeTab.id as number, message).catch(error => {
                        speakErrorMessage(error);
                    });
                } else {
                    chrome.tts.speak('Diese Funktion steht nur auf der Homepage von Youtube zur Verfügung.');
                }
            });
        } else if (
            message.type === MessageType.COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO ||
            message.type === MessageType.COMMAND_START_NEXT_YOUTUBE_VIDEO ||
            message.type === MessageType.COMMAND_MUTE_YOUTUBE_VIDEO ||
            message.type === MessageType.COMMAND_UNMUTE_YOUTUBE_VIDEO ||
            message.type === MessageType.COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO ||
            message.type === MessageType.COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE ||
            message.type === MessageType.COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE ||
            message.type === MessageType.COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN ||
            message.type === MessageType.COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN ||
            message.type === MessageType.COMMAND_ACTIVATE_YOUTUBE_SEARCH) {
            handleYoutubeVideoPage(message);
        } else if (message.type === MessageType.COMMAND_SEARCH_ON_GOOGLE) {
            getActiveTab().then(googleTab => {
                if (googleTab.url?.startsWith('https://www.google.de')) {
                    chrome.tabs.sendMessage(googleTab.id as number, message).catch(error => {
                        speakErrorMessage(error);
                    });
                } else {
                    chrome.tts.speak('Diese Funktion steht nur auf der Homepage von Google zur Verfügung.');
                }
            });
        }
    });
});

/**
 * helper function, gets the active tab
 * @return active Tab
 * */
async function getActiveTab() {
    const tabs = await chrome.tabs.query({currentWindow: true, active: true});
    return tabs[0];
}

/**
 * helper function, checks if it is the youtube homepage
 * */
function isYoutubeHomePage(url: string) {
    return url?.startsWith('https://www.youtube.com') && (!url?.includes('/watch?v=') || url?.includes('watch?app=desktop&v='));
}

/**
 * helper function, checks if it is the youtube video page
 * */
function isYoutubeVideoPage(url: string) {
    return url?.startsWith('https://www.youtube.com') && (url?.includes('/watch?v=') || url?.includes('watch?app=desktop&v='));
}

/**
 * helper function that forwards the message to the youtube video page
 * */
function handleYoutubeVideoPage(message: Message) {
    console.log()
    getActiveTab().then(youtubeVideoTab => {
        console.log(youtubeVideoTab);
        if (isYoutubeVideoPage(youtubeVideoTab.url as string)) {
            chrome.tabs.sendMessage(youtubeVideoTab.id as number, message).catch(error => {
                speakErrorMessage(error);
            });
        } else {
            chrome.tts.speak('Diese Funktion steht nur zur Verfügung, wenn ein Youtube-Video geöffnet wurde.');
        }
    });
}

/**
 * speaker error message, if message cant be delivered
 * */
function speakErrorMessage(error: any) {
    console.log('Error: ', error);
    chrome.tts.speak('Es ist ein Fehler aufgetreten. Probieren Sie es später nochmal.');
}