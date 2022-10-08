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
    COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1,
    COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2,
    COMMAND_ACTIVATE_YOUTUBE_SEARCH,
    COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1,
    COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2,
    COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_CURRENT_WEATHER_BY_CITY,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2,
    COMMAND_DUPLICATE_1,
    COMMAND_DUPLICATE_2,
    COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_GO_BACK_1,
    COMMAND_GO_BACK_2,
    COMMAND_GO_BACK_3,
    COMMAND_GO_FORWARD_1,
    COMMAND_GO_FORWARD_2,
    COMMAND_GO_FORWARD_3,
    COMMAND_HOW_ARE_YOU, COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW,
    COMMAND_MOVE_TAB_TO_FIRST_POSITION,
    COMMAND_MOVE_TAB_TO_LAST_POSITION,
    COMMAND_MOVE_TAB_TO_LEFT_POSITION, COMMAND_MOVE_TAB_TO_NEW_WINDOW, COMMAND_MOVE_TAB_TO_RIGHT_POSITION,
    COMMAND_MUTE_YOUTUBE_VIDEO_1,
    COMMAND_MUTE_YOUTUBE_VIDEO_2,
    COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE,
    COMMAND_OPEN_GOOGLE,
    COMMAND_OPEN_GOOGLE_ALL_RESULT_1,
    COMMAND_OPEN_GOOGLE_ALL_RESULT_2,
    COMMAND_OPEN_GOOGLE_ALL_RESULT_3,
    COMMAND_OPEN_GOOGLE_BOOK_RESULT_1,
    COMMAND_OPEN_GOOGLE_BOOK_RESULT_2,
    COMMAND_OPEN_GOOGLE_BOOK_RESULT_3,
    COMMAND_OPEN_GOOGLE_FINANCE_RESULT_1,
    COMMAND_OPEN_GOOGLE_FINANCE_RESULT_2,
    COMMAND_OPEN_GOOGLE_FINANCE_RESULT_3,
    COMMAND_OPEN_GOOGLE_FLY_RESULT_1,
    COMMAND_OPEN_GOOGLE_FLY_RESULT_2,
    COMMAND_OPEN_GOOGLE_FLY_RESULT_3,
    COMMAND_OPEN_GOOGLE_IMAGE_RESULT_1,
    COMMAND_OPEN_GOOGLE_IMAGE_RESULT_2,
    COMMAND_OPEN_GOOGLE_IMAGE_RESULT_3,
    COMMAND_OPEN_GOOGLE_MAPS_RESULT_1,
    COMMAND_OPEN_GOOGLE_MAPS_RESULT_2,
    COMMAND_OPEN_GOOGLE_MAPS_RESULT_3,
    COMMAND_OPEN_GOOGLE_NEWS_RESULT_1,
    COMMAND_OPEN_GOOGLE_NEWS_RESULT_2,
    COMMAND_OPEN_GOOGLE_NEWS_RESULT_3,
    COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_1,
    COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_2,
    COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_3,
    COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_1,
    COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_2,
    COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_3,
    COMMAND_OPEN_WEBSITE_1,
    COMMAND_OPEN_WEBSITE_2,
    COMMAND_OPEN_YOUTUBE_PAGE,
    COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4,
    COMMAND_RESET_1,
    COMMAND_RESET_2,
    COMMAND_RESET_3,
    COMMAND_SEARCH_ON_GOOGLE,
    COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH,
    COMMAND_START_NEXT_YOUTUBE_VIDEO,
    COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_TODAY_WEATHER_BY_CITY,
    COMMAND_UNMUTE_YOUTUBE_VIDEO
} from "../models/command";

let connection: any = undefined;

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
    openTab('https://www.youtube.com');
    command.resetTranscript();
}

/**
 * open youtube video based on the index, from left top side to the right side
 * */
function openYoutubeVideo(selectedVideo) {
    // check if index is one, handle this one specific
    if (selectedVideo === 'eins') selectedVideo = 1;
    const message: Message = {message: selectedVideo, type: MessageType.COMMAND_YOUTUBE_VIDEO_SELECTION_ON_DESKTOP};
    connection.postMessage(message);
}

/**
 * pause or start the video
 * */
function playOrPauseVideo() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_PAUSE_OR_PLAY_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

/**
 * starts the next video in the playlist
 * */
function startNextYoutubeVideo() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_START_NEXT_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

/**
 * mutes the video
 * */
function muteYoutubeVideo() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MUTE_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

/**
 * unmutes the video
 * */
function unMuteYoutubeVideo() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_UNMUTE_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

/**
 * change volume
 * */
function changeVolume(volume) {
    console.log('Volume: ', volume.split('%')[0]);
    const message: Message = {
        message: parseInt(volume.split('%')[0]),
        type: MessageType.COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO
    }
    connection.postMessage(message);
}

/**
 * activate cinema mode
 * */
function activateCinemaMode() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE
    }
    connection.postMessage(message);
}

/**
 * deactivate cinema mode
 * */
function deactivateCinemaMode() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE
    }
    connection.postMessage(message);
}

/**
 * activate youtube fullscreen
 * */
function activateFullScreen() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN
    }
    connection.postMessage(message);
}

/**
 * deactivate cinema mode
 * */
function deactivateFullScreen() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN
    }
    connection.postMessage(message);
}

/**
 * activate youtube search
 * */
function activateSearch() {
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_ACTIVATE_YOUTUBE_SEARCH
    }
    connection.postMessage(message);
}

/**
 * open google page
 * */
function openGoogle() {
    openTab('https://google.de');
}

/**
 * helper function, open tab and send a message to the background
 * */
function openTab(url: string) {
    chrome.tabs.create({
        url: url
    });
}

/**
 * helper function, send message to background
 * */
function searchOnGoogle(toBeSearched: string) {
    console.log('Search string: ', toBeSearched);
    const message: Message = {
        message: toBeSearched,
        type: MessageType.COMMAND_SEARCH_ON_GOOGLE
    }
    connection.postMessage(message);
}

/**
 * helper function, send message to background
 * */
function searchOnGoogleAfterSearch(toBeSearched: string) {
    console.log('Search string: ', toBeSearched);
    const message: Message = {
        message: toBeSearched,
        type: MessageType.COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH
    }
    connection.postMessage(message);
}

/**
 * helper function, send message to background
 * */
function openImageResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_IMAGE_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openVideoResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_VIDEOS_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openShoppingResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_SHOPPING_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openNewsResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_NEWS_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openAllResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_ALL_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openMapsResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_MAPS_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openBookResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_BOOK_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openFinanceResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_FINANCE_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openFLyResults(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GOOGLE_FLY_RESULT
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function openGmailOnGoogleHomepage(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, opens the website in a new tab
 * */
function openWebsite(website) {
    console.log(website);
    try {
        chrome.tabs.create({url: 'https://www.' + website});
    } catch (e) {
        speak('Es ist leider ein Fehler aufgetreten. Bitte versuchen Sie es nochmal.')
    }
}

/**
 * helper function, send message to background
 * */
function goBack(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_GO_BACK
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function goForward(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_GO_FORWARD
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function duplicatePage(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_DUPLICATE_PAGE
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveTabToFirstPosition(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_TAB_TO_FIRST_POSITION
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveTabToLastPosition(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_TAB_TO_LAST_POSITION
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveTabToLeftPosition(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_TAB_TO_LEFT_POSITION
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveTabToRightPosition(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_TAB_TO_RIGHT_POSITION
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveTabToNewWindow(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_TAB_TO_NEW_WINDOW
    }
    connection.postMessage(message);
    command.resetTranscript();
}

/**
 * helper function, send message to background
 * */
function moveAllTabsToNewWindow(command) {
    console.log(command);
    const message: Message = {
        message: '',
        type: MessageType.COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW
    }
    connection.postMessage(message);
    command.resetTranscript();
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
            command: [COMMAND_RESET_1, COMMAND_RESET_2, COMMAND_RESET_3],
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
            command: COMMAND_START_NEXT_YOUTUBE_VIDEO,
            callback: startNextYoutubeVideo
        },
        {
            command: COMMAND_MUTE_YOUTUBE_VIDEO_1,
            callback: muteYoutubeVideo
        },
        {
            command: COMMAND_MUTE_YOUTUBE_VIDEO_2,
            callback: muteYoutubeVideo
        },
        {
            command: COMMAND_UNMUTE_YOUTUBE_VIDEO,
            callback: unMuteYoutubeVideo
        },
        {
            command: COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1,
            callback: changeVolume
        },
        {
            command: COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2,
            callback: changeVolume
        },
        {
            command: COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1,
            callback: activateCinemaMode
        },
        {
            command: COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2,
            callback: activateCinemaMode
        },
        {
            command: COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1,
            callback: deactivateCinemaMode
        },
        {
            command: COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2,
            callback: deactivateCinemaMode
        },
        {
            command: COMMAND_ACTIVATE_YOUTUBE_SEARCH,
            callback: activateSearch
        },
        /*{
            command: COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN_1,
            callback: activateFullScreen
        },
        {
            command: COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN_2,
            callback: activateFullScreen
        },
        {
            command: COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN_1,
            callback: deactivateFullScreen
        },
        {
            command: COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN_2,
            callback: deactivateFullScreen
        },*/
        {
            command: COMMAND_OPEN_GOOGLE,
            callback: openGoogle
        },
        {
            command: COMMAND_SEARCH_ON_GOOGLE,
            callback: searchOnGoogle
        },
        {
            command: COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH,
            callback: searchOnGoogleAfterSearch
        },
        {
            command: [COMMAND_OPEN_GOOGLE_IMAGE_RESULT_1, COMMAND_OPEN_GOOGLE_IMAGE_RESULT_2, COMMAND_OPEN_GOOGLE_IMAGE_RESULT_3],
            callback: openImageResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_1, COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_2, COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_3],
            callback: openVideoResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_1, COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_2, COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_3],
            callback: openShoppingResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_NEWS_RESULT_1, COMMAND_OPEN_GOOGLE_NEWS_RESULT_2, COMMAND_OPEN_GOOGLE_NEWS_RESULT_3],
            callback: openNewsResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_ALL_RESULT_1, COMMAND_OPEN_GOOGLE_ALL_RESULT_2, COMMAND_OPEN_GOOGLE_ALL_RESULT_3],
            callback: openAllResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_MAPS_RESULT_1, COMMAND_OPEN_GOOGLE_MAPS_RESULT_2, COMMAND_OPEN_GOOGLE_MAPS_RESULT_3],
            callback: openMapsResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_BOOK_RESULT_1, COMMAND_OPEN_GOOGLE_BOOK_RESULT_2, COMMAND_OPEN_GOOGLE_BOOK_RESULT_3],
            callback: openBookResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_FINANCE_RESULT_1, COMMAND_OPEN_GOOGLE_FINANCE_RESULT_2, COMMAND_OPEN_GOOGLE_FINANCE_RESULT_3],
            callback: openFinanceResults
        },
        {
            command: [COMMAND_OPEN_GOOGLE_FLY_RESULT_1, COMMAND_OPEN_GOOGLE_FLY_RESULT_2, COMMAND_OPEN_GOOGLE_FLY_RESULT_3],
            callback: openFLyResults
        },
        {
            command: COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE,
            callback: openGmailOnGoogleHomepage
        },
        {
            command: [COMMAND_OPEN_WEBSITE_1, COMMAND_OPEN_WEBSITE_2],
            callback: openWebsite
        },
        {
            command: [COMMAND_GO_BACK_1, COMMAND_GO_BACK_2, COMMAND_GO_BACK_3],
            callback: goBack
        },
        {
            command: [COMMAND_GO_FORWARD_1, COMMAND_GO_FORWARD_2, COMMAND_GO_FORWARD_3],
            callback: goForward
        },
        {
            command: [COMMAND_DUPLICATE_1, COMMAND_DUPLICATE_2],
            callback: duplicatePage
        },
        {
            command: [COMMAND_MOVE_TAB_TO_FIRST_POSITION],
            callback: moveTabToFirstPosition
        },
        {
            command: [COMMAND_MOVE_TAB_TO_LAST_POSITION],
            callback: moveTabToLastPosition
        },
        {
            command: [COMMAND_MOVE_TAB_TO_LEFT_POSITION],
            callback: moveTabToLeftPosition
        },
        {
            command: [COMMAND_MOVE_TAB_TO_RIGHT_POSITION],
            callback: moveTabToRightPosition
        },
        {
            command: [COMMAND_MOVE_TAB_TO_NEW_WINDOW],
            callback: moveTabToNewWindow
        },
        {
            command: [COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW],
            callback: moveAllTabsToNewWindow
        },
    ]

    const message: Message = {
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