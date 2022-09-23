import {Message, MessageType} from "../models/Message";
import {
    BACKGROUND_ID,
    EXTENSION_ID,
    getExtensionUrl
} from "../utils/utils";
import Tab = chrome.tabs.Tab;
import Port = chrome.runtime.Port;


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
    const message: Message = {
        message: "",
        type: MessageType.START_RECOGNITION
    };
    setTimeout((args) => {
        chrome.windows.getCurrent(function (win) {
            chrome.tabs.query({'windowId': win.id},
                function (tabArray: Tab[]) {
                    for (let i in tabArray) {
                        if (tabArray[i].url === getExtensionUrl()) {
                            const connection = setupCommunication(tabArray[i].id as number);
                            connection.postMessage(message);
                            connection.onMessage.addListener(function (message, port) {
                                handleIncomingMessages(message, port);
                            });
                        }
                    }
                }
            );
        });
    }, 800);
});

function setupCommunication(tabId: number) {
    return chrome.tabs.connect(tabId, {
        name: BACKGROUND_ID
    });
}

function handleIncomingMessages(message: Message, port: Port) {
    if (message.type === MessageType.RECOGNITION_STARTED) {
        console.log('Message received: ', message);
    } else if (message.type === MessageType.COMMAND_CALL) {

    }
}
