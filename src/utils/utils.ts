// communication specific

import {Daily, Temp, Weather, WeatherByCity, WeatherCondition, WeatherElement, WeatherGroup} from "../models/weather";
import {TimeUtility} from "./time-utility";

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

export async function fetchWeatherByCity(city: string): Promise<WeatherByCity> {
    const apiKey = "63d5425e0db4c078c33bbd8253793a29";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=de&units=metric&&appid=${apiKey}`;
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
            if (i === weatherElements.length) {
                // last element
                sentence += 'und ' + condition + ` bei ${Math.round(currentTemp)} Grad Celsius`;
            } else {
                sentence += condition + ', ';
            }
        }
    }
    return sentence;
}

export function buildWeatherResponseForToday(weatherElements: WeatherElement[], minTemp, maxTemp): string {
    let sentence = '';
    if (weatherElements.length === 0) {
        sentence = `Heute werden Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
    } else if (weatherElements.length === 1) {
        sentence = `Heute wird es hauptsächlich ${weatherElements[0].description} sein. Es werden dabei Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
    } else {
        sentence = 'Heute wird es '
        for (let i = 0; i < weatherElements.length; i++) {
            const condition = weatherElements[i].description;
            console.log('Cond: ', condition);
            if (i === weatherElements.length) {
                // last element
                sentence += 'und ' + condition + ` sein. Dabei werden Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
            } else {
                sentence += condition + ', ';
            }
        }
    }
    return sentence;
}

export function buildCurrentWeatherResponseForCity(city: string, weatherElements: WeatherElement[], currentTemp): string {
    let sentence = '';
    if (weatherElements.length === 0) {
        sentence = `Aktuell liegt die Temperatur in ${city} bei ${Math.round(currentTemp)} Grad Celsius`;
    } else if (weatherElements.length === 1) {
        sentence = `Momentan ist es in ${city} ${weatherElements[0].description} bei ${Math.round(currentTemp)} Grad Celsius`;
    } else {
        sentence = `Momentan ist es in ${city} `
        for (let i = 0; i < weatherElements.length; i++) {
            const condition = weatherElements[i].description;
            if (i === weatherElements.length) {
                // last element
                sentence += 'und ' + condition + ` bei ${Math.round(currentTemp)} Grad Celsius`;
            } else {
                sentence += condition + ', ';
            }
        }
    }
    return sentence;
}

export function buildWeatherResponseForTodayByCity(city: string, weatherElements: WeatherElement[], minTemp, maxTemp): string {
    let sentence = '';
    if (weatherElements.length === 0) {
        sentence = `Heute werden in ${city} Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
    } else if (weatherElements.length === 1) {
        sentence = `Heute wird es in ${city} hauptsächlich ${weatherElements[0].description} sein. Es werden dabei Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
    } else {
        sentence = `Heute wird es in ${city} `
        for (let i = 0; i < weatherElements.length; i++) {
            const condition = weatherElements[i].description;
            console.log('Cond: ', condition);
            if (i === weatherElements.length) {
                // last element
                sentence += 'und ' + condition + ` sein. Dabei werden Temperaturen zwischen ${Math.round(minTemp)} und ${Math.round(maxTemp)} Grad erreicht`;
            } else {
                sentence += condition + ', ';
            }
        }
    }
    return sentence;
}

export function buildWeatherResponseForNextThreeDays(day1: Daily, day2: Daily, day3: Daily): string {
    const weatherConditions = new WeatherCondition();
    const minTemp = Math.min(day1.temp.min, day2.temp.min, day3.temp.min);
    const maxTemp = Math.min(day1.temp.max, day2.temp.max, day3.temp.max);

    if (day1.weather.length === 0 && day2.weather.length === 0 && day3.weather.length === 0) {
        return `In den nächsten drei Tagen werden Tiefstemperaturen von ${minTemp} Grad und Höchsttemperaturen von ${maxTemp} Grad erreicht.`;
    }
    return buildResponseForDay1(day1, weatherConditions) + buildResponseForDay2(day2, weatherConditions) + buildResponseForDay3(day3, weatherConditions);
}

function buildResponseForDay1(day: Daily, weatherConditions: WeatherCondition) {
    let sentence = '';
    const timeUtility = new TimeUtility(day.dt);
    console.log('Date: ', timeUtility.date);
    if (checkIsRaining(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend regnerisch mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsThunderStorming(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend stürmisch mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsSunny(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend klar mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsFoggy(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend neblig mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsCloudy(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend bewölkt mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsSnow(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es überwiegend schneien mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    } else if (checkIsSquall(day.weather[0].id, weatherConditions)) {
        sentence += `Morgen wird es sehr stürmig mit einer Temperatur von ${Math.round(day.temp.day)} Grad.`;
    }
    return sentence;
}

function buildResponseForDay2(day: Daily, weatherConditions: WeatherCondition) {
    let sentence = '';
    const timeUtility = new TimeUtility(day.dt);
    console.log('Date: ', timeUtility.date);
    const weekDay = timeUtility.getWeekDayAsLocalString();
    if (checkIsRaining(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich regnerisch und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsThunderStorming(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich stürmig und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsSunny(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich klar und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsFoggy(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich neblig und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsCloudy(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich bewölkt und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsSnow(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es hauptsächlich schneien und die Temperaturen reichen von ${Math.round(day.temp.min)} bis ${Math.round(day.temp.max)} Grad`;
    } else if (checkIsSquall(day.weather[0].id, weatherConditions)) {
        sentence += ` Am ${weekDay} wird es sehr stürmig und die Temperaturen reichen von ${Math.round(day.temp.min)} Grad bis ${Math.round(day.temp.max)} Grad.`;
    }
    return sentence;
}

function buildResponseForDay3(day: Daily, weatherConditions: WeatherCondition) {
    let sentence = '';
    const timeUtility = new TimeUtility(day.dt);
    console.log('Date: ', timeUtility.date);
    const weekDay = timeUtility.getWeekDayAsLocalString();
    if (checkIsRaining(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird überwiegend regnerisch, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsThunderStorming(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird überwiegend stürmig, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsSunny(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird überwiegend klar, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsFoggy(day.weather[0].id, weatherConditions)) {
        sentence += ` Der${weekDay} wird überwiegend neblig, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsCloudy(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird überwiegend bewölkt, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsSnow(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird überwiegend schneien, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    } else if (checkIsSquall(day.weather[0].id, weatherConditions)) {
        sentence += ` Der ${weekDay} wird sehr stürmig, dabei werden Tiefsttemperaturen von ${Math.round(day.temp.min)} Grad und Höchsttemperaturen von ${Math.round(day.temp.max)} Grad erreicht.`;
    }
    return sentence;
}

function checkIsRaining(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Rain, id) || weatherConditions.checkIs(WeatherGroup.Drizzle, id);
}

function checkIsThunderStorming(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.ThunderStorm, id);
}

function checkIsSquall(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Squall, id);
}

function checkIsSunny(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Clear, id);
}

function checkIsFoggy(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Fog, id) || weatherConditions.checkIs(WeatherGroup.Mist, id);
}

function checkIsCloudy(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Clouds, id);
}

function checkIsSnow(id: number, weatherConditions: WeatherCondition): boolean {
    return weatherConditions.checkIs(WeatherGroup.Snow, id);
}