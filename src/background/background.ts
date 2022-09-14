const extensionId = chrome.i18n.getMessage("@@extension_id");

function getUrl(filename: string) {
    return "chrome-extension://" + extensionId + "/";
}

function openTab(filename: any) {
    let tabOpen: boolean = false;
    console.log('Extension Id: ', extensionId);
    chrome.windows.getCurrent(function (win) {
        chrome.tabs.query({'windowId': win.id},
            function (tabArray) {
                for (let i in tabArray) {
                    console.log('Tab: ', tabArray[i] , 'Url: ', tabArray[i].url);
                    if (tabArray[i].url === getUrl(filename)) {
                        // @ts-ignore
                        chrome.tabs.update(tabArray[i].id, {
                            active: true
                        });
                        tabOpen = true;
                        console.log('Found the tab: ', tabArray[i]);
                        break;
                    }
                    console.log('Continue the search');
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
});
