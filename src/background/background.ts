import {Message, MessageType} from "../models/Message";
import Tab = chrome.tabs.Tab;

const extensionId = chrome.i18n.getMessage("@@extension_id");

function getUrl() {
    return "chrome-extension://" + extensionId + "/";
}

function openTab(filename: any) {
    let tabOpen: boolean = false;
    console.log('Extension Id: ', extensionId);
    chrome.windows.getCurrent(function (win) {
        chrome.tabs.query({'windowId': win.id},
            function (tabArray) {
                for (let i in tabArray) {
                    if (tabArray[i].url === getUrl()) {
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
                        if (tabArray[i].url === getUrl()) {
                            const connection = setupMessageConnection(tabArray[i].id as number);
                            connection.postMessage(message);
                            connection.onMessage.addListener(function (message, port) {
                                handleIncomingMessages(message);
                            });
                            break;
                        }
                    }
                }
            );
        });
    }, 800);
});


function handleIncomingMessages(message: Message) {
    if(message.type === MessageType.RECOGNITION_STARTED) {
        console.log('Message received: ', message);
    }
}


function setupMessageConnection(tabId:number){
    return chrome.tabs.connect( tabId, {
        name: extensionId
    });
}

