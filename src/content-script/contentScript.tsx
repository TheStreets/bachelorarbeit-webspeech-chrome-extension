import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import './contentScript.css';
import Box from "@mui/material/Box";
import {InputElement} from "../models/InputElement";
import {CONTENT_SCRIPT_ID} from "../utils/utils";
import {Message, MessageType} from "../models/Message";
import InputFillComponent from "../components/InputFillComponent";
import {Component} from "../models/assignment";
import Port = chrome.runtime.Port;

const root = document.createElement('div');
let port: any = null;

document.body.appendChild(root);

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
    const [text, setText] = useState("");
    const [component, setComponent] = useState(Component.NO_COMPONENT);


    useEffect(() => {

    }, [component]);

    return (
        <>
            {component === Component.NO_COMPONENT &&
                <Box sx={{position: 'fixed', top: '20%', left: '20%', fontSize: '3rem', color: 'red'}}></Box>}
            {component === Component.INPUT_FILLER_COMPONENT && <InputFillComponent inputFields={getInputFields()} text={text}/>}
        </>
    )
}

ReactDOM.render(<App/>, root);
