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
 * helper function, gets the controls from the video
 * @return array of youtube control elements
 * */
function getYoutubeVideoControls() {
    const leftControls = Array.from(document.getElementsByClassName('ytp-left-controls'));
    const rightControls = Array.from(document.getElementsByClassName('ytp-right-controls'));
    return leftControls.concat(rightControls);
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
    const [paused, setPaused] = useState(false);

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
                    console.log('pausing video');
                    const playButton = Array.from(document.getElementsByClassName('ytp-play-button'))[0] as HTMLButtonElement;
                    playButton.click();
                    break;
                case MessageType.COMMAND_START_NEXT_YOUTUBE_VIDEO:
                    console.log('starting next video');
                    const nextVideoButton = Array.from(document.getElementsByClassName('ytp-next-button'))[0] as HTMLAnchorElement;
                    nextVideoButton.click();
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
