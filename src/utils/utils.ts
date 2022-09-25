// communication specific

import {Weather, WeatherElement} from "../models/weather_condition";

export const EXTENSION_ID = chrome.i18n.getMessage("@@extension_id");
export const CONTENT_SCRIPT_ID = `${EXTENSION_ID}/contentScript`;
export const BACKGROUND_ID = `${EXTENSION_ID}/backgroundScript`;

// recognition specific
export const ASSISTANT_NAME = 'Chrome';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;

export function getExtensionUrl() {
    return "chrome-extension://" + EXTENSION_ID + "/";
}

export async function fetchWeather(lat: number, lon: number): Promise<Weather> {
    const apiKey = "63d5425e0db4c078c33bbd8253793a29";
    const url = `https://api.openweathermap.org/data/3.0/onecall?lang=de&units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Dienst zur Zeit nicht verfügbar')
    }
    return await response.json();
}

export function getCurrentLocation(): Promise<any> {
    const timeout = 1000 * 30 // 30s
    const refreshTime = 1000 * 60 * 60 * 24// 24h
    const options = {
        enableHighAccuracy: true,
        timeout: timeout,
        maximumAge: refreshTime
    }
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}

export function buildCurrentWeatherResponse(weatherElements: WeatherElement[], currentTemp): string {
    let sentence = '';
    if (weatherElements.length === 0) {
        sentence = `Aktuell liegt die Temperatur bei ${Math.round(currentTemp)} Grad Celsius`;
    } else if (weatherElements.length === 1) {
        sentence = `Momentan ist es ${weatherElements[0].description} bei ${Math.round(currentTemp)}  Grad Celsius`;
    } else {
        sentence = 'Momentan ist es '
        for (let i = 0; i < weatherElements.length; i++) {
            const condition = weatherElements[i].description;
            console.log('Cond: ', condition);
            if (i === weatherElements.length){
                // last element
                sentence +=  'und ' + condition + ` bei ${Math.round(currentTemp)} Grad Celsius`;
            } else {
                sentence += condition + ', ';
            }
        }
    }
    return sentence;
}
