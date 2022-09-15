import "./Home.css";
import {Message, MessageType} from "../models/Message";

const recognition = setupSpeechRecognition();

function checkCommand(message: string) {
    if (message === 'Hallo Assistent') {
        chrome.tts.speak("Hallo Meister");
    }
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
    console.log('Recognition started');
}

function onErrorEvent(event: any) {
    console.log('Recognition Error');
}

function onResultEvent(event: any) {
    let result = "";
    console.log('Recognition OnResult');
    // loop over all results
    for (let i = 0; i < event.results.length; ++i) {
        // check if result is end result
        if (event.results[i].isFinal) {
            result += event.results[i][0].transcript;
            checkCommand(result);
        }
    }
    console.log('Result: ', result);
}

function onEndEvent() {
    console.log('Recognition onEnd');
    recognition.start();
}

function Home() {

    let result = "";

    recognition.onstart = onStartEvent

    recognition.onerror = onErrorEvent

    recognition.onresult = onResultEvent

    recognition.onend = onEndEvent

    chrome.runtime.onConnect.addListener(function (connection) {
        connection.onMessage.addListener(function (message) {
            if (message.type === MessageType.START_RECOGNITION) {
                console.log('Received Message: ', message);
                recognition.start();
                const msg: Message = {
                    message: "",
                    type: MessageType.RECOGNITION_STARTED
                }
                connection.postMessage(msg);
            }
        });
    });

    return (
        <div>
            <h1>Homepage works</h1>
        </div>
    );
}

export default Home