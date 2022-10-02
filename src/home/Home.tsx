import "./Home.css";
import {Message, MessageType} from "../models/Message";
import {
    buildCurrentWeatherResponse,
    buildCurrentWeatherResponseForCity,
    buildWeatherResponseForNextThreeDays,
    buildWeatherResponseForToday,
    buildWeatherResponseForTodayByCity,
    EXTENSION_ID,
    fetchWeather,
    fetchWeatherByCity,
    getCurrentLocation
} from "../utils/utils";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Box from "@mui/material/Box";
import {Button, Divider, SvgIcon, TextField, Typography} from "@mui/material";
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import {CommandTable} from "../components/CommandTableComponent";
import {
    COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_CURRENT_WEATHER_BY_CITY,
    COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_HOW_ARE_YOU,
    COMMAND_OPEN_YOUTUBE_PAGE,
    COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4, COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_5,
    COMMAND_RESET, COMMAND_START_NEXT_YOUTUBE_VIDEO,
    COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_TODAY_WEATHER_BY_CITY
} from "../models/command";

let connection:any = undefined;

function speak(text: string) {
    chrome.tts.speak(text)
}


/**
 * @param position as geolocation
 * @param type: possible values 'current', 'today', 'forCast'
 * */
function getWeatherByBrowserLocation(position, type: string): any {
    if (type === 'current') {
        fetchWeather(position.coords.latitude, position.coords.longitude)
            .then(weather => {
                const response = buildCurrentWeatherResponse(weather.current.weather, weather.current.temp);
                speak(response);
            })
            .catch(error => {
                console.log('Error calling weather api: ', error)
                speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
            });
    } else if (type === 'today') {
        fetchWeather(position.coords.latitude, position.coords.longitude)
            .then(weather => {
                console.log('Weather: ', weather);
                const response = buildWeatherResponseForToday(weather.daily[0].weather, weather.daily[0].temp.min, weather.daily[0].temp.max);
                speak(response);
            })
            .catch(error => {
                console.log('Error calling weather api: ', error)
                speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
            });
    } else if (type === 'forCast') {
        fetchWeather(position.coords.latitude, position.coords.longitude)
            .then(weather => {
                console.log('Weather: ', weather);
                const response = buildWeatherResponseForNextThreeDays(weather.daily[1], weather.daily[2], weather.daily[3]);
                speak(response);
            })
            .catch(error => {
                console.log('Error calling weather api: ', error)
                speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
            });
    }
}

/**
 * * @param type: possible values 'current', 'today', 'forCast'
 * */
function handleWeatherRequestByBrowserLocation(type: string) {
    getCurrentLocation().then(position => {
        console.log(position);
        if (position) {
            if (type === 'current') {
                getWeatherByBrowserLocation(position, 'current');
            } else if (type === 'today') {
                getWeatherByBrowserLocation(position, 'today');
            } else if (type === 'forCast') {
                getWeatherByBrowserLocation(position, 'forCast');
            }
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

/**
 * @param city
 * @param type possible values: 'current', 'today'
 * */
function handleWeatherRequestByCity(city: string, type: string) {
    if (type === 'current') {
        fetchWeatherByCity(city)
            .then(weather => {
                console.log('Weather: ', weather);
                const response = buildCurrentWeatherResponseForCity(city, weather.weather, weather.main.temp);
                speak(response);
            })
            .catch(error => {
                console.log('Error calling weather api: ', error)
                speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
            });
    } else if (type === 'today') {
        fetchWeatherByCity(city)
            .then(weather => {
                console.log('Weather: ', weather);
                const response = buildWeatherResponseForTodayByCity(city, weather.weather, weather.main.temp_min, weather.main.temp_max);
                speak(response);
            })
            .catch(error => {
                console.log('Error calling weather api: ', error)
                speak('Es ist ein Fehler aufgetreten. Versuchen Sie es zu einem späteren Zeitpunkt nochmal.');
            });
    }
}

/**
 * open tab input url youtube.com
 * */
function openYoutube(command) {
    console.log(command);
    chrome.tabs.create({
        url: 'https://www.youtube.com'
    }).then(tab => {
        if (tab.id) {
            const message: Message = {message: '', type: MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP};
            chrome.tabs.sendMessage(tab.id, message);
        }
    });
}

/**
 * open youtube video based on the index, from left top side to the right side
 * */
function openYoutubeVideo(index) {
    // check if index is one, handle this one specific
    if(index === 'eins') index = 1;
    const message: Message = {message: index, type: MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP};
    connection.postMessage(message);
}

/**
 * pause or start the video
 * */
function playOrPauseVideo() {
    const message:Message ={
        message: '',
        type: MessageType.COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}


function startNextYoutubeVideo() {
    const message:Message ={
        message: '',
        type: MessageType.COMMAND_START_NEXT_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

function Home() {
    const commands = [
        {
            command: COMMAND_HOW_ARE_YOU,
            callback: (command) => {
                console.log(command);
                speak('Danke für die Nachfrage. Mir geht es gut.');
                command.resetTranscript();
            }
        },
        {
            command: COMMAND_RESET,
            callback: (command) => command.resetTranscript()
        },
        {
            command: COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
            callback: () => handleWeatherRequestByBrowserLocation('current')
        },
        {
            command: COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION,
            callback: () => handleWeatherRequestByBrowserLocation('today')
        },
        {
            command: COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
            callback: () => handleWeatherRequestByBrowserLocation('forCast')
        },
        {
            command: COMMAND_CURRENT_WEATHER_BY_CITY,
            callback: (city) => handleWeatherRequestByCity(city, 'current')
        },
        {
            command: COMMAND_TODAY_WEATHER_BY_CITY,
            callback: (city) => handleWeatherRequestByCity(city, 'today')
        },
        {
            command: COMMAND_OPEN_YOUTUBE_PAGE,
            callback: openYoutube
        },
        {
            command: COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX,
            callback: openYoutubeVideo
        },
        {
            command: COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1,
            callback: playOrPauseVideo
        },
        {
            command: COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2,
            callback: playOrPauseVideo
        },
        {
            command: COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3,
            callback: playOrPauseVideo
        },
        {
            command: COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4,
            callback: playOrPauseVideo
        },
        {
            command: COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_5,
            callback: playOrPauseVideo
        },
        {
            command: COMMAND_START_NEXT_YOUTUBE_VIDEO,
            callback: startNextYoutubeVideo
        },
    ]
    const message:Message = {
        message: '',
        type: MessageType.SETUP_COMMUNICATION
    };
    const port = chrome.runtime.connect({name: EXTENSION_ID});
    connection = port;
    port.postMessage(message);

    const {
        transcript, isMicrophoneAvailable, listening, browserSupportsSpeechRecognition,
    } = useSpeechRecognition({commands: commands});

    if (!browserSupportsSpeechRecognition) {
        return (
            <Box style={{height: 'calc(100vh - 64px - 1rem - 4px)'}}>
                <Typography variant={"h1"} component={"h1"}>Der Browser ist nicht geeignet Sprache zu
                    erkennen.</Typography>
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
                <Box paddingTop={"1rem"}>
                    <CommandTable/>
                </Box>
            </Box>
        </Box>
    );
}

export default Home