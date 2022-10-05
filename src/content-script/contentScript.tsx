import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import './contentScript.css';
import Box from "@mui/material/Box";
import {InputElement} from "../models/InputElement";
import InputFillComponent from "../components/InputFillComponent";
import {Component} from "../models/components";
import {Message, MessageType} from "../models/Message";


const root = document.createElement('div');

document.body.appendChild(root);

// ===========
// utilities
// ===========

/**
 * helper function, speaker error messages
 * */
function speakErrorMessage(error: string = 'Diese Funktion steht zur Zeit nicht zur Verfügung.') {
    chrome.tts.speak(error);
}

// ===========
// youtube
// ===========

/**
 * helper function that loads all a tags from the videos, so that the specified video can be clicked
 * */
function getYoutubeVideosForSelection() {
    const links = Array.from(document.getElementsByTagName('a'));
    const filtered = links.filter(link => {
        const hrefAttribute = link.getAttribute('href');
        if (hrefAttribute) {
            if (link.className === 'yt-simple-endpoint inline-block style-scope ytd-thumbnail') {
                if (hrefAttribute.includes('/watch?v=')) return link;
            }
        }
    })
    console.log(filtered);
    return filtered;
}

/**
 * helper function, triggers the click on the mute button
 * */
function handleMuteClick() {
    const player = document.getElementsByClassName('video-stream html5-main-video')[0] as HTMLVideoElement;
    console.log(player.muted);
    const muteButton = Array.from(document.getElementsByClassName('ytp-mute-button'))[0] as HTMLButtonElement;
    if (player.muted) {
        muteButton.click();
        player.muted = false;
        console.log('Muting video');
    } else {
        player.muted = true;
        muteButton.click();
        console.log('UnMuting video');
    }
    console.log(player.muted)
}

/**
 * helper function, triggers the click on the fullscreen button
 * */
function handleFullScreenClick() {
    try {
        const fullscreenButton = document.getElementsByClassName('ytp-fullscreen-button ytp-button')[0] as HTMLButtonElement;
        console.log(fullscreenButton);
        fullscreenButton.click();
        console.log('fullscreen activated/deactivated');
    } catch (e) {
        speakErrorMessage();
    }
}

/**
 * helper function, triggers the click on the cinema mode button
 * */
function handleCinemaModeClick() {
    try {
        const cinemaModeButton = document.getElementsByClassName('ytp-size-button ytp-button')[0] as HTMLButtonElement;
        cinemaModeButton.click();
        console.log('cinema mode activated/deactivated');
    } catch (e) {
        speakErrorMessage();
    }
}

/**
 * helper function, handles all youtube requests
 * */
function handleYoutubeRequests(message: Message, setComponent: Dispatch<SetStateAction<Component>>) {
    switch (message.type) {
        case MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP:
            const videos = getYoutubeVideosForSelection();
            try {
                const selectedVideo = message.message;
                videos[selectedVideo].click();
            } catch (e) {
                chrome.tts.speak('Leider ist ein Fehler aufgetreten, ich kann Ihre Anfrage nicht bearbeiten.')
            }
            setComponent(Component.NO_COMPONENT);
            break;
        case MessageType.COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO:
            try {
                const player = document.getElementsByClassName('video-stream html5-main-video')[0] as HTMLVideoElement;
                if (!player.paused) {
                    player.pause();
                    console.log('pausing video');
                } else {
                    player.play();
                }
            } catch (e) {
                chrome.tts.speak('Ein Fehler ist aufgetreten, es könnte deine Anfrage nicht bearbeitet werden.');
            }
            break;
        case MessageType.COMMAND_START_NEXT_YOUTUBE_VIDEO:
            try {
                console.log('starting next video');
                const nextVideoButton = Array.from(document.getElementsByClassName('ytp-next-button'))[0] as HTMLAnchorElement;
                nextVideoButton.click();
            } catch (e) {
                chrome.tts.speak('Ein Fehler ist aufgetreten, es könnte deine Anfrage nicht bearbeitet werden.');
            }
            break;
        case MessageType.COMMAND_MUTE_YOUTUBE_VIDEO:
            handleMuteClick();
            break;
        case MessageType.COMMAND_UNMUTE_YOUTUBE_VIDEO:
            handleMuteClick();
            break;
        case MessageType.COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO:
            try {
                const player = document.getElementsByClassName('video-stream html5-main-video')[0] as HTMLVideoElement;
                console.log('Changing Volume');
                player.volume = message.message / 100;
            } catch (e) {
                chrome.tts.speak('Ein Fehler ist aufgetreten, es könnte deine Anfrage nicht bearbeitet werden.')
            }
            break;
        case MessageType.COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE:
            handleCinemaModeClick();
            break;
        case MessageType.COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE:
            handleCinemaModeClick();
            break;
        case MessageType.COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN:
            handleFullScreenClick();
            break;
        case MessageType.COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN:
            handleFullScreenClick();
            break;
        case MessageType.COMMAND_ACTIVATE_YOUTUBE_SEARCH:
            const searchButton = document.getElementById('voice-search-button') as HTMLDivElement;
            const aTag = searchButton.getElementsByClassName('yt-simple-endpoint style-scope ytd-button-renderer')[0] as HTMLAnchorElement;
            aTag.click();
            break;
    }
}

// ===========
// google
// ===========

/**
 * puts the search request in the input field and starts the search
 * */
function searchOnGoogle(toBeSearched: string) {
    const searchField = document.getElementsByClassName('gLFyf gsfi')[0] as HTMLInputElement;
    searchField.value = toBeSearched;
    const buttonsContainer = document.getElementsByClassName('FPdoLc lJ9FBc')[0] as HTMLDivElement;
    const submitButton = buttonsContainer.getElementsByClassName('gNO89b')[0] as HTMLInputElement;
    submitButton.click();
}

/**
 * puts the search request in the input field and starts the search again
 * */
function searchOnGoogleAfterSearched(toBeSearched: string) {
    const inputContainer = document.getElementsByClassName('a4bIc')[0] as HTMLDivElement;
    console.log(document.getElementsByClassName('a4bIc'));
    const inputField = inputContainer.children.item(2) as HTMLInputElement;
    inputField.value = toBeSearched;
    const submitButton = document.getElementsByClassName('Tg7LZd')[0] as HTMLButtonElement;
    submitButton.click();
}

/**
 * helper function, checks if the page shown is the all result page
 * */
function isOnPageAllResults() {
    return !(document.getElementsByClassName('MUFPAc')[0] as HTMLDivElement === undefined || null);
}

/**
 * helper function, checks if the page shown is the image result page
 * */
function isOnPageImageResults() {
    return !(document.getElementsByClassName('T47uwc')[0] as HTMLDivElement === undefined || null);
}

/**
 * helper function, checks if the page shown is the video, shopping result page
 * */
function isOnPageVideosResults() {
    return !(document.getElementsByClassName('IC1Ck')[0] as HTMLDivElement === undefined || null);
}

/**
 * helper function, gets the menu from the google page
 * */
function getGoogleMenuOnAllResults() {
    return document.getElementsByClassName('MUFPAc')[0] as HTMLDivElement;
}

/**
 * helper function, gets the menu from the google page
 * */
function getGoogleMenuOnImageResults() {
    return document.getElementsByClassName('T47uwc')[0] as HTMLDivElement;
}

/**
 * helper function, gets the menu from the google page
 * */
function getGoogleMenuOnVideoResults() {
    return document.getElementsByClassName('IC1Ck')[0] as HTMLDivElement;
}

/**
 * helper function, handles the actual click of the given page
 * */
function handleMenuClick(anchorTags, resultPage: string) {
    Array.from(anchorTags).forEach(anchor => {
        if ((anchor as HTMLAnchorElement).innerText.toLowerCase() === resultPage) {
            (anchor as HTMLAnchorElement).click();
        }
    })
}

/**
 * opens the menu results
 * @param resultPage values: 'alle', 'bilder', 'maps', 'videos', 'news', 'shopping', 'bücher'
 * */
function openGoogleResults(resultPage: string) {
    if (isOnPageAllResults()) {
        try {
            const menu = getGoogleMenuOnAllResults();
            const anchorTags = menu.getElementsByTagName('a');
            console.log(anchorTags);
            handleMenuClick(anchorTags, resultPage);
        } catch (e) {
            speakErrorMessage();
        }
    } else if (isOnPageImageResults()) {
        try {
            const menu = getGoogleMenuOnImageResults();
            const anchorTags = menu.getElementsByTagName('a');
            const filteredATags = Array.from(anchorTags).filter(aTag => aTag.className === 'NZmxZe');
            console.log(filteredATags);
            handleMenuClick(filteredATags, resultPage);
        } catch (e) {
            speakErrorMessage();
        }
    } else if (isOnPageVideosResults()) {
        try {
            const menu = getGoogleMenuOnVideoResults();
            const anchorTags = menu.getElementsByTagName('a');
            console.log(anchorTags);
            handleMenuClick(anchorTags, resultPage);
        } catch (e) {
            speakErrorMessage();
        }
    }
}

/**
 * helper function, handles all google requests
 * */
function handleGoogleRequests(message: Message, setComponent: Dispatch<SetStateAction<Component>>) {
    switch (message.type) {
        case MessageType.COMMAND_SEARCH_ON_GOOGLE:
            searchOnGoogle(message.message);
            break;
        case MessageType.COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH:
            searchOnGoogleAfterSearched(message.message);
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_IMAGE_RESULT:
            openGoogleResults('bilder');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_VIDEOS_RESULT:
            openGoogleResults('videos');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_SHOPPING_RESULT:
            openGoogleResults('shopping');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_NEWS_RESULT:
            openGoogleResults('news');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_ALL_RESULT:
            openGoogleResults('alle');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_MAPS_RESULT:
            openGoogleResults('maps');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_BOOK_RESULT:
            openGoogleResults('bücher');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_FINANCE_RESULT:
            openGoogleResults('finanzen');
            break;
        case MessageType.COMMAND_OPEN_GOOGLE_FLY_RESULT:
            openGoogleResults('flüge');
            break;
    }
}

function getInputFields() {
    const inputs = document.getElementsByTagName('input');
    const filteredInputs: InputElement[] = [];
    for (let i = 0; i < inputs.length; i++) {
        const inputElem = inputs.item(i);

        if (inputElem) {
            if (inputElem.style.visibility !== 'hidden' || inputElem.type !== 'hidden') {
                if (inputElem.type === 'text') {
                    const info = inputElem.getBoundingClientRect();
                    const position = {
                        x: info.left,
                        y: info.top
                    }
                    const size = {
                        width: info.width,
                        height: info.height
                    };
                    filteredInputs.push({
                        input: inputElem,
                        position: position,
                        size: size
                    });
                }
            }
        }
    }
    return filteredInputs;
}

const App: React.FC<{}> = () => {
    const [component, setComponent] = useState(Component.INIT);

    useEffect(() => {
        chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
            switch (message.type) {
                case MessageType.COMMAND_NO_COMPONENT:
                    setComponent(Component.NO_COMPONENT);
                    break;
                default:
                    console.log('Wrong component');
            }
            handleYoutubeRequests(message, setComponent);
            handleGoogleRequests(message, setComponent);
        });
    }, [component]);

    return (
        <>
            {component === Component.NO_COMPONENT && <Box></Box>}
            {component === Component.INPUT_FILLER_COMPONENT &&
                <InputFillComponent inputFields={getInputFields()} text={''}/>}
        </>
    )
}

ReactDOM.render(<App/>, root);
