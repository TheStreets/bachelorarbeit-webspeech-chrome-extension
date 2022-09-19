import "./Home.css";
import {Message, MessageType} from "../models/Message";
import {BACKGROUND_ID, CONTENT_SCRIPT_ID} from "../utils/utils";
import Tab = chrome.tabs.Tab;
import Port = chrome.runtime.Port;


const recognition = setupSpeechRecognition();

let contentScriptPort: any = null;
let backgroundScriptPort: any = null;

function setupCommunication() {
    // connection with the background.js
    chrome.runtime.onConnect.addListener(function (connection: Port) {
        if (connection.name === CONTENT_SCRIPT_ID) {
            contentScriptPort = connection;
            connection.onMessage.addListener(function (message) {
                if (message.type === MessageType.SETUP_COMMUNICATION) {
                    const msg: Message = {message: "", type: MessageType.COMMUNICATION_ESTABLISHED}
                    connection.postMessage(msg);
                }
            });
        }
        if (connection.name === BACKGROUND_ID) {
            backgroundScriptPort = connection;
            connection.onMessage.addListener(function (message) {
                if (message.type === MessageType.START_RECOGNITION) {
                    recognition.start();
                    console.log('Received Message: ', message);
                    const msg: Message = {
                        message: "",
                        type: MessageType.RECOGNITION_STARTED
                    }
                    connection.postMessage(msg);
                } else if (message.type === MessageType.COMMAND_CALL) {

                }
            });
        }
    });
}

function setupSpeechRecognition() {
    // @ts-ignore
    window.SpeechRecognition = window.webkitSpeechRecognition || window.mozSpeechRecognition || window.SpeechRecognition;
    // @ts-ignore
    const recognition = new window.SpeechRecognition();
    recognition.lang = "de_DE";
    recognition.maxAlternatives = 1;
    recognition.interimResults = false;
    recognition.continuous = true;
    return recognition;
}

function onStartEvent() {
    // console.log('Recognition started');
}

function onErrorEvent(event: any) {
    // console.log('Recognition Error');
}

function onResultEvent(event: any) {
    let result = "";
    console.log('Recognition OnResult');
    // loop over all results
    for (let i = 0; i < event.results.length; ++i) {
        // check if result is end result
        if (event.results[i].isFinal) {
            result += event.results[i][0].transcript;
            const message: Message = {
                message: result,
                type: MessageType.COMMAND_CALL
            };
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs: Tab[]) {
                if (backgroundScriptPort) {
                    backgroundScriptPort.postMessage(message);
                    result = "";
                }
            });
        }
    }
}

function onEndEvent() {
    // console.log('Recognition onEnd');
    recognition.start();
}

function Home() {

    recognition.onstart = onStartEvent

    recognition.onerror = onErrorEvent

    recognition.onresult = onResultEvent

    recognition.onend = onEndEvent

    setupCommunication();

    return (
        <div>
            <h1>Homepage works</h1>
        </div>
    );
}

export default Home