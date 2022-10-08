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
        } else if (message.type === MessageType.COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO ||
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
        } else if (message.type === MessageType.COMMAND_SEARCH_ON_GOOGLE ||
            message.type === MessageType.COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE) {
            getActiveTab().then(googleTab => {
                if (googleTab.url?.startsWith('https://www.google.de')) {
                    chrome.tabs.sendMessage(googleTab.id as number, message).catch(error => {
                        speakErrorMessage(error);
                    });
                } else {
                    chrome.tts.speak('Diese Funktion steht nur auf der Homepage von Google zur Verfügung.');
                }
            });
        } else if (message.type === MessageType.COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_IMAGE_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_VIDEOS_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_NEWS_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_SHOPPING_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_ALL_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_FINANCE_RESULT ||
            message.type === MessageType.COMMAND_OPEN_GOOGLE_FLY_RESULT) {
            handleGoogleSearchPage(message);
        } else if (message.type === MessageType.COMMAND_GO_BACK) {
            handleBrowserNavigation('back');
        } else if (message.type === MessageType.COMMAND_GO_FORWARD) {
            handleBrowserNavigation('forward');
        } else if (message.type === MessageType.COMMAND_DUPLICATE_PAGE) {
            handleBrowserNavigation('duplicate');
        } else if (message.type === MessageType.COMMAND_MOVE_TAB_TO_FIRST_POSITION) {
            handleBrowserTabMovement('move_first');
        } else if (message.type === MessageType.COMMAND_MOVE_TAB_TO_LAST_POSITION) {
            handleBrowserTabMovement('move_last');
        } else if (message.type === MessageType.COMMAND_MOVE_TAB_TO_LEFT_POSITION) {
            handleBrowserTabMovement('move_left');
        } else if (message.type === MessageType.COMMAND_MOVE_TAB_TO_RIGHT_POSITION) {
            handleBrowserTabMovement('move_right');
        } else if (message.type === MessageType.COMMAND_MOVE_TAB_TO_NEW_WINDOW) {
            handleBrowserTabMovement('new_window');
        } else if (message.type === MessageType.COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW) {
            handleBrowserTabMovement('all_to_new_window');
        } else if (message.type === MessageType.COMMAND_OPEN_TAB) {
            openBrowserTab(message);
        } else if (message.type === MessageType.COMMAND_CLOSE_TAB) {
            handleBrowserClosing('active');
        } else if (message.type === MessageType.COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW) {
            handleBrowserClosing('current_window');
        } else if (message.type === MessageType.COMMAND_CLOSE_ALL_WINDOWS) {
            handleBrowserClosing('all_windows');
        }
    });
});

/**
 * helper function, handle back navigation or forward navigation
 * @param action possible value: 'back', 'forward', 'duplicate', 'move_first', 'move_last'
 * */
function handleBrowserNavigation(action: string) {
    try {
        getActiveTab().then(activeTab => {
            if (activeTab) {
                const url = activeTab.url;
                console.log('Url: ', url);
                if (url && url !== getExtensionUrl()) {
                    if (action === 'back') {
                        chrome.tabs.goBack().catch(reason => {
                            speakErrorMessage('Es gibt keine Seite, die ich nach zurück springen kann.');
                        });
                    } else if (action === 'forward') {
                        chrome.tabs.goForward().catch(reason => {
                            speakErrorMessage('Es gibt keine Seite, die ich nach vorne springen kann.');
                        });
                    } else if (action === 'duplicate') {
                        chrome.tabs.duplicate(activeTab.id as number);
                    }
                } else {
                    speakErrorMessage('Ihre Anfrage konnte nicht bearbeitet werden. Überprüfen Sie, dass Sie sich nicht auf die Seite des Programms befinden.');
                }
            } else {
                speakErrorMessage();
            }
        });
    } catch (e) {
        speakErrorMessage();
    }
}

/**
 * helper function, handle back navigation or forward navigation
 * @param action possible value: 'move_first', 'move_last', 'move_left', 'move_right'
 * */
function handleBrowserTabMovement(action: string) {
    getActiveTab().then(activeTab => {
        if (action === 'move_first') {
            moveTabToPosition(activeTab.id as number, 0);
        } else if (action === 'move_last') {
            moveTabToPosition(activeTab.id as number, -1);
        } else if (action === 'move_left') {
            const tabId = activeTab.id as number;
            chrome.tabs.query({currentWindow: true}, tabs => {
                for (let i = 0; i < tabs.length; i++) {
                    const tab = tabs[i];
                    if (activeTab.url === tab.url) {
                        console.log('Found the tab');
                        if (i === 0) {
                            moveTabToPosition(tabId, -1);
                            break;
                        }
                        moveTabToPosition(tabId, i - 1);
                        break;
                    }
                }
            });
        } else if (action === 'move_right') {
            const tabId = activeTab.id as number;
            chrome.tabs.query({currentWindow: true}, tabs => {
                for (let i = 0; i < tabs.length; i++) {
                    const tab = tabs[i];
                    if (activeTab.url === tab.url) {
                        console.log('Found the tab');
                        if (i === tabs.length - 1) {
                            moveTabToPosition(tabId, 0);
                            break;
                        }
                        moveTabToPosition(tabId, i + 1);
                        break;
                    }
                }
            });
        } else if (action === 'new_window') {
            try {
                chrome.windows.getCurrent(oldWindow => {
                    chrome.windows.create({
                        top: oldWindow.top,
                        left: oldWindow.left,
                        width: oldWindow.width,
                        height: oldWindow.height,
                        focused: false
                    }, window => {
                        getActiveTab().then(activeTab => {
                            const id: number = activeTab.id as number;
                            if (id) {
                                chrome.tabs.move(id, {index: 0, windowId: window?.id}).then(tab => {
                                    chrome.windows.update(window?.id as number, {state: oldWindow.state})
                                        .catch(error => speakErrorMessage());
                                });
                            }
                        }).catch(error => speakErrorMessage());
                    });
                });
            } catch (e) {
                speakErrorMessage()
            }
        } else if (action === 'all_to_new_window') {
            try {
                try {
                    chrome.tabs.query({}, tabs => {
                        chrome.windows.getCurrent(oldWindow => {
                            chrome.windows.create({
                                top: oldWindow.top,
                                left: oldWindow.left,
                                width: oldWindow.width,
                                height: oldWindow.height,
                                focused: false
                            }, window => {
                                const ids: number[] = tabs.map(tab => tab.id ? tab.id : -1);
                                chrome.tabs.move(ids, {index: 0, windowId: window?.id})
                                    .then(tabs => {
                                        chrome.windows.update(window?.id as number, {state: oldWindow.state})
                                            .catch(error => speakErrorMessage());
                                    }).catch(error => speakErrorMessage());
                            });
                        });
                    });
                } catch (e) {
                    speakErrorMessage();
                }
            } catch (e) {
                speakErrorMessage()
            }
        }
    });
}

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
function speakErrorMessage(error: string = 'Es ist ein Fehler aufgetreten. Probieren Sie es zu einem späteren Zeitpunkt noch einmal.') {
    console.log('Error: ', error);
    chrome.tts.speak(error);
}

/**
 * helper function that forwards the message to the google search page
 * */
function handleGoogleSearchPage(message: Message) {
    getActiveTab().then(googleSearchedTab => {
        if (googleSearchedTab.url?.startsWith('https://www.google.de/search?q=')) {
            chrome.tabs.sendMessage(googleSearchedTab.id as number, message).catch(error => {
                speakErrorMessage(error);
            });
        } else {
            speakErrorMessage('Diese Funktion steht nur zur Verfügung, wenn eine Suche bereits gestartet wurde.');
        }
    });
}

/**
 * helper function, moves the tab to the position
 * */
function moveTabToPosition(theTabToBeMoved: number, toPosition: number) {
    chrome.tabs.move(theTabToBeMoved, {index: toPosition}).catch(reason => {
        speakErrorMessage();
    });
}

/**
 * helper function, openbrowser tab with the given number
 * */
function openBrowserTab(message: Message) {
    console.log(message);
    const index: number = message.message;
    chrome.tabs.query({currentWindow: true}, tabs => {
        chrome.tabs.update(tabs[index].id as number, {active: true})
            .catch(e => speakErrorMessage('Es ist ein Fehler aufgetreten. Bitte wähle eine gültige Registerkarte.'));
    });
}

/**
 * helper function, close the active tab
 * @param action values: 'active', 'current_window'
 * */
function handleBrowserClosing(action: string) {
    if (action === 'active') {
        getActiveTab().then(activeTab => {
            const id: number = activeTab?.id as number;
            chrome.tabs.remove(id).catch((e) => speakErrorMessage());
        });
    } else if (action === 'current_window') {
        chrome.windows.getCurrent().then(window => {
            console.log('Remove window: ', window.id as number);
            chrome.windows.remove(window.id as number, () => {
            });
        }).catch(e => speakErrorMessage());
    } else if (action === 'all_windows') {
        chrome.windows.getAll().then(windows => {
            windows.map(window => {
                chrome.windows.remove(window.id as number, () => {
                });
            });
        });
    }
}