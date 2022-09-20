import {Message, MessageType} from "../models/Message";
import {
    ASSIGNMENTS,
    ASSISTANT_WAKEUP_COMMAND,
    BACKGROUND_ID,
    CONTENT_SCRIPT_ID,
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
        checkCommand(message.message, port);
    }
}

function checkCommand(message: string, port: Port) {
    console.log('Checking message: ', message)
    if (message.startsWith(ASSISTANT_WAKEUP_COMMAND)) {
        const assignment = message.split(ASSISTANT_WAKEUP_COMMAND)[1].trim();
        console.log(assignment)
        handleAssignment(assignment.toLowerCase(), port);
    }
}

function handleAssignment(assignment: string, port: Port) {
    console.log('Checking assignment: ', assignment)
    for (let i = 0; i < ASSIGNMENTS.length; i++) {
        const todo = ASSIGNMENTS[i];
        console.log('Todo: ', todo);
        if (assignment.startsWith(todo.request.toLowerCase())) {
            console.log('Handling Response');
            const msg: Message = {message: todo.component, type: MessageType.COMMAND_CALL}
            port.postMessage(msg);
            handleResponse(todo.response.toLowerCase());
            break;
        }
    }
    // handleResponse('Es tut mir leid. Ich bin nicht in der Lage Ihnen zu helfen.');
}

function handleResponse(response: string) {
    console.log('Speaking response: ', response);
    chrome.tts.speak(response);
}