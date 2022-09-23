import "./Home.css";
import {Message, MessageType} from "../models/Message";
import {BACKGROUND_ID, COMMANDS, CONTENT_SCRIPT_ID} from "../utils/utils";
import Port = chrome.runtime.Port;
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Box from "@mui/material/Box";
import {
    Button,
    Divider,
    SvgIcon,
    TextField,
    Typography
} from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import {CommandosTable} from "../components/CommandosComponent";


function setupCommunication() {
    // connection with the background.js
    chrome.runtime.onConnect.addListener(function (connection: Port) {
        if (connection.name === CONTENT_SCRIPT_ID) {
            connection.onMessage.addListener(function (message) {
                if (message.type === MessageType.SETUP_COMMUNICATION) {
                    const msg: Message = {message: "", type: MessageType.COMMUNICATION_ESTABLISHED}
                    connection.postMessage(msg);
                }
            });
        }
        if (connection.name === BACKGROUND_ID) {
            connection.onMessage.addListener(function (message) {
                if (message.type === MessageType.START_RECOGNITION) {
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


function Home() {

    const {
        transcript,
        isMicrophoneAvailable,
        listening
    } = useSpeechRecognition({commands: COMMANDS});

    function startRecognition(event) {
        if (!isMicrophoneAvailable) {
            SpeechRecognition.startListening({continuous: true, language: 'de_DE'});
        }
    }

    return (
        <Box paddingX={"2rem"}>
            <Box paddingY={"1rem"}>
                <>
                    {listening &&
                        <Typography variant="h5" component="h2" style={{textAlign: 'center', color: 'white'}}>
                            Die Aufnahme ist gestartet. Sie können nun die Kommandos benutzen.
                        </Typography>
                    }
                    {!listening &&
                        <Typography variant="h5" component="h2" style={{textAlign: 'center', color: 'white'}}>
                            Damit diese Chrome App einwandfrei arbeiten kann, werden Mikrofonrechte benötigt.
                            Bitte bestätigen Sie diese Rechte in dem Sie auf den Button klicken.
                        </Typography>
                    }
                </>
                <Box paddingTop={"2rem"} paddingBottom={"1rem"}>
                    <Button variant="contained"
                            disabled={!!(listening)}
                            onClick={startRecognition}>Aufnahme starten</Button>
                </Box>
                <Box paddingY={".5rem"}>
                    <SvgIcon component={KeyboardVoiceIcon} style={
                        (listening) ? {
                            color: 'green',
                            fontSize: 40
                        } : {
                            color: 'red',
                            fontSize: 40
                        }
                    }/>
                </Box>
            </Box>
            <Divider/>
            <Box paddingY={"1rem"}>
                <Typography style={{color: 'white', textTransform: 'uppercase'}}>Ihr Gesprochenes</Typography>
                <Box paddingTop={"1rem"}>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={10}
                        maxRows={10}
                        value={transcript}
                        variant="filled"
                        className={"bachelor-arbeit-chrome-extension-textarea"}
                    />
                </Box>
            </Box>
            <Divider/>
            <Box paddingY={"1rem"}>
                <Typography style={{color: 'white', textTransform: 'uppercase'}}>Kommandos</Typography>
                <Box>
                    <Typography color={"secondary"}>
                        Jeder Befehl startet mit diesen Worten: Hallo Chrome
                    </Typography>
                </Box>
                <Box paddingTop={"1rem"}>
                    <CommandosTable/>
                </Box>
            </Box>
        </Box>
    );
}

export default Home