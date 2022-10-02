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
            chrome.tabs.query({currentWindow: true, active: true})
                .then(tabs => {
                    const activeTab = tabs[0];
                    console.log(activeTab);
                    const isYoutubeHomepage = activeTab.url?.startsWith('https://www.youtube.com') &&
                        !activeTab.url?.includes('/watch?v=');
                    if (isYoutubeHomepage) {
                        chrome.tabs.sendMessage(activeTab.id as number, message);
                    } else {
                        chrome.tts.speak('Diese Funktion steht nur auf der Homepage von Youtube zur Verfügung.')
                    }
                });
        }

    });
});
