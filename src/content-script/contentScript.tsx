import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import './contentScript.css';
import Box from "@mui/material/Box";
import {InputElement} from "../models/InputElement";
import InputFillComponent from "../components/InputFillComponent";
import {Component} from "../models/components";
import {Message, MessageType} from "../models/Message";


const root = document.createElement('div');

document.body.appendChild(root);

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
        chrome.tts.speak('Ein Fehler ist aufgetreten, es könnte deine Anfrage nicht bearbeitet werden.')
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
        chrome.tts.speak('Ein Fehler ist aufgetreten, es könnte deine Anfrage nicht bearbeitet werden.')
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
                case MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP:
                    const videos = getYoutubeVideosForSelection();
                    console.log('Video: ', message.message);
                    try {
                        const selectedVideo = message.message;
                        console.log('Opening Video: ', selectedVideo);
                        videos[selectedVideo].click();
                    } catch (e) {
                        chrome.tts.speak('Leider ist ein Fehler aufgetreten, ich kann Ihre Anfrage nicht bearbeiten.')
                    }
                    console.log('Setting component')
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
                default:
                    console.log('Wrong component');
            }
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
