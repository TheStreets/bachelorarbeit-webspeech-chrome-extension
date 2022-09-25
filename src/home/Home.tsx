import "./Home.css";
import {Message, MessageType} from "../models/Message";
import {
    ASSISTANT_WAKEUP_COMMAND,
    BACKGROUND_ID,
    buildCurrentWeatherResponse,
    buildCurrentWeatherResponseForCity,
    buildWeatherResponseForToday,
    buildWeatherResponseForTodayByCity,
    CONTENT_SCRIPT_ID,
    fetchWeather,
    fetchWeatherByCity,
    getCurrentLocation
} from "../utils/utils";
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
import {useState} from "react";


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

    const commands = [
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} wie geht es dir`,
            callback: (command) => {
                console.log(command);
                chrome.tts.speak('Danke für die Nachfrage. Mir geht es gut.');
            }
        },
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} vergiss dein Gedächtnis`,
            callback: ({resetTranscript}) => {
                resetTranscript();
            }
        },
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter`,
            callback: () => {
                // logging
                // get geolocation
                getCurrentLocation().then(position => {
                    console.log(position);
                    if (position) {
                        fetchWeather(position.coords.latitude, position.coords.longitude)
                            .then(weather => {
                                console.log('Weather: ', weather);
                                const response = buildCurrentWeatherResponse(weather.current.weather, weather.current.temp);
                                chrome.tts.speak(response);
                            })
                            .catch(error => {
                                console.log('Error calling weather api: ', error)
                                chrome.tts.speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
                            });
                    }
                }).catch(error => {
                    const errors = {
                        1: "Keine Berechtigung erteilt",
                        2: "Etwas ist schief gegangen",
                        3: "Die Anfrage hat zu lange gedauert"
                    }
                    console.log(errors[error]);
                });
            }
        },
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute`,
            callback: () => {
                getCurrentLocation().then(position => {
                    console.log(position);
                    if (position) {
                        fetchWeather(position.coords.latitude, position.coords.longitude)
                            .then(weather => {
                                console.log('Weather: ', weather);
                                const response = buildWeatherResponseForToday(weather.daily[0].weather, weather.daily[0].temp.min, weather.daily[0].temp.max);
                                chrome.tts.speak(response);
                            })
                            .catch(error => {
                                console.log('Error calling weather api: ', error)
                                chrome.tts.speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
                            });
                    }
                }).catch(error => {
                    const errors = {
                        1: "Keine Berechtigung erteilt",
                        2: "Etwas ist schief gegangen",
                        3: "Die Anfrage hat zu lange gedauert"
                    }
                    console.log(errors[error]);
                });
            }
        },
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter in *`,
            callback: (city) => {
                fetchWeatherByCity(city)
                    .then(weather => {
                        console.log('Weather: ', weather);
                        const response = buildCurrentWeatherResponseForCity(city, weather.weather, weather.main.temp);
                        chrome.tts.speak(response);
                    })
                    .catch(error => {
                        console.log('Error calling weather api: ', error)
                        chrome.tts.speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
                    });
            }
        },
        {
            command: `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute in *`,
            callback: (city) => {
                fetchWeatherByCity(city)
                    .then(weather => {
                        console.log('Weather: ', weather);
                        const response = buildWeatherResponseForTodayByCity(city, weather.weather, weather.main.temp_min, weather.main.temp_max);
                        chrome.tts.speak(response);
                    })
                    .catch(error => {
                        console.log('Error calling weather api: ', error)
                        chrome.tts.speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
                    });
            }
        },
    ]

    const {
        transcript,
        isMicrophoneAvailable,
        listening,
        browserSupportsSpeechRecognition,
        resetTranscript
    } = useSpeechRecognition({commands: commands});

    const [recognizedText, setRecognizedText] = useState(transcript);

    if (!browserSupportsSpeechRecognition) {
        return (
            <Box>
                <Typography variant={"h1"} component={"h1"}>Der Browser ist nicht geeignet Sprache zu erkennen.</Typography>
            </Box>
        );
    }

    function startRecognition(event) {
        if (!isMicrophoneAvailable) {
            SpeechRecognition.startListening({continuous: true, language: 'de_DE', interimResults: false});
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