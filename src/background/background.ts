import {
    EXTENSION_ID,
    getExtensionUrl
} from "../utils/utils";

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

chrome.action.onClicked.addListener((tab) => {
    openTab("index.html")
    // const message: Message = {
    //     message: "",
    //     type: MessageType.START_RECOGNITION
    // };
    // setTimeout((args) => {
    //     chrome.windows.getCurrent(function (win) {
    //         chrome.tabs.query({'windowId': win.id},
    //             function (tabArray: Tab[]) {
    //                 for (let i in tabArray) {
    //                     if (tabArray[i].url === getExtensionUrl()) {
    //                         const connection = setupCommunication(tabArray[i].id as number);
    //                         connection.postMessage(message);
    //                         connection.onMessage.addListener(function (message, port) {
    //                             handleIncomingMessages(message, port);
    //                         });
    //                     }
    //                 }
    //             }
    //         );
    //     });
    // }, 800);
});

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

function createContextMenus() {
    chrome.contextMenus.create({
        title: 'Text vorlesen',
        id: `virtual_assistant/menu_1`,
        contexts: ['selection']
    });
}


