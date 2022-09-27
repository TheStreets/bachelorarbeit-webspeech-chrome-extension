export interface Weather {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    daily: Daily[];
}

export interface Current {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherElement[];
}

export interface WeatherElement {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Daily {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: Temp;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherElement[];
    clouds: number;
    pop: number;
    uvi: number;
}

export interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Temp {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

export interface Minutely {
    dt: number;
    precipitation: number;
}

export interface WeatherByCity {
    coord: Coord;
    weather: WeatherElement[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface Clouds {
    all: number;
}

export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Wind {
    speed: number;
    deg: number;
}


export enum WeatherGroup {
    ThunderStorm,
    Drizzle,
    Rain,
    Snow,
    Clear,
    Clouds,
    Mist,
    Smoke,
    Haze,
    Dust,
    Fog,
    Sand,
    Ash,
    Squall,
    Tornado
}

interface IWeatherCondition {
    conditions: WeatherConditionElement[]
}

interface WeatherConditionElement {
    group: WeatherGroup;
    id: number;
    translatedValue: string;
}

export class WeatherCondition implements IWeatherCondition {
    conditions: WeatherConditionElement[];

    constructor() {
        this.conditions = [
            // weather group thunderstorm
            {
                group: WeatherGroup.ThunderStorm,
                id: 200,
                translatedValue: 'Gewitter mit leichtem Regen'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 201,
                translatedValue: 'Gewitter mit Regen'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 202,
                translatedValue: 'Gewitter mit Starkregen'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 210,
                translatedValue: 'leichtes Gewitter'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 211,
                translatedValue: 'Gewitter'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 212,
                translatedValue: 'schweres Gewitter'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 221,
                translatedValue: 'Gewitter'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 230,
                translatedValue: 'Gewitter mit leichtem Nieselregen'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 231,
                translatedValue: 'Gewitter mit Nieselregen'
            },
            {
                group: WeatherGroup.ThunderStorm,
                id: 232,
                translatedValue: 'Gewitter mit starkem Nieselregen'
            },
            // weathergroup drizzle
            {
                group: WeatherGroup.Drizzle,
                id: 300,
                translatedValue: 'leichter Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 301,
                translatedValue: 'Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 302,
                translatedValue: 'starker Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 310,
                translatedValue: 'leichter Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 311,
                translatedValue: 'leichter Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 312,
                translatedValue: 'starker Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 313,
                translatedValue: 'Regenschauer und Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 314,
                translatedValue: 'heftiger Regenschauer und Nieselregen'
            },
            {
                group: WeatherGroup.Drizzle,
                id: 321,
                translatedValue: 'Regenschauer und Nieselregen'
            },
            // weathergroup rain
            {
                group: WeatherGroup.Rain,
                id: 500,
                translatedValue: 'Leichter Regen'
            },
            {
                group: WeatherGroup.Rain,
                id: 501,
                translatedValue: 'Moderater Regen'
            },
            {
                group: WeatherGroup.Rain,
                id: 502,
                translatedValue: 'Starker Regen'
            },
            {
                group: WeatherGroup.Rain,
                id: 503,
                translatedValue: 'Sehr starker Regen'
            },
            {
                group: WeatherGroup.Rain,
                id: 504,
                translatedValue: 'Extremer Regen'
            },
            {
                group: WeatherGroup.Rain,
                id: 511,
                translatedValue: 'Blitzeis'
            },
            {
                group: WeatherGroup.Rain,
                id: 520,
                translatedValue: 'Leichter Regenschauer'
            },
            {
                group: WeatherGroup.Rain,
                id: 521,
                translatedValue: 'Regenschauer'
            },
            {
                group: WeatherGroup.Rain,
                id: 522,
                translatedValue: 'starker Regenschauer'
            },
            {
                group: WeatherGroup.Rain,
                id: 531,
                translatedValue: 'Schauerartiger Regen'
            },
            // weathergroup snow
            {
                group: WeatherGroup.Snow,
                id: 600,
                translatedValue: 'leichter Schnee'
            },
            {
                group: WeatherGroup.Snow,
                id: 601,
                translatedValue: 'Schnee'
            },
            {
                group: WeatherGroup.Snow,
                id: 602,
                translatedValue: 'Starker Schneefall'
            },
            {
                group: WeatherGroup.Snow,
                id: 611,
                translatedValue: 'Schneeregen'
            },
            {
                group: WeatherGroup.Snow,
                id: 612,
                translatedValue: 'Leichter Schneeregen'
            },
            {
                group: WeatherGroup.Snow,
                id: 613,
                translatedValue: 'Schneeregen'
            },
            {
                group: WeatherGroup.Snow,
                id: 615,
                translatedValue: 'Leichter Regen und Schnee'
            },
            {
                group: WeatherGroup.Snow,
                id: 616,
                translatedValue: 'Regen und Schnee'
            },
            {
                group: WeatherGroup.Snow,
                id: 620,
                translatedValue: 'Leichter Schneeregen'
            },
            {
                group: WeatherGroup.Snow,
                id: 621,
                translatedValue: 'Schneeregen'
            },
            {
                group: WeatherGroup.Snow,
                id: 622,
                translatedValue: 'Starker Schneeregen'
            },
            // weathergroup mist
            {
                group: WeatherGroup.Mist,
                id: 701,
                translatedValue: 'Nebel'
            },
            // weathergroup smoke
            {
                group: WeatherGroup.Smoke,
                id: 711,
                translatedValue: 'Rauch'
            },
            // weathergroup haze
            {
                group: WeatherGroup.Haze,
                id: 721,
                translatedValue: 'Dunst'
            },
            // weathergroup dust
            {
                group: WeatherGroup.Dust,
                id: 731,
                translatedValue: 'Sand-/Staubwirbel'
            },
            {
                group: WeatherGroup.Dust,
                id: 761,
                translatedValue: 'Staubig'
            },
            // weathergroup fog
            {
                group: WeatherGroup.Fog,
                id: 741,
                translatedValue: 'Nebel'
            },
            // weathergroup sand
            {
                group: WeatherGroup.Sand,
                id: 751,
                translatedValue: 'Sand'
            },
            // weathergroup ash
            {
                group: WeatherGroup.Ash,
                id: 762,
                translatedValue: 'Vulkanasche'
            },
            // weathergroup squall
            {
                group: WeatherGroup.Squall,
                id: 771,
                translatedValue: 'Sturmböen'
            },
            // weathergroup tornado
            {
                group: WeatherGroup.Tornado,
                id: 781,
                translatedValue: 'Tornado'
            },
            // weathergroup clear
            {
                group: WeatherGroup.Clear,
                id: 800,
                translatedValue: 'klarer Himmel'
            },
            // weathergroup clouds
            {
                group: WeatherGroup.Clouds,
                id: 801,
                translatedValue: 'leicht bewölkt'
            },
            {
                group: WeatherGroup.Clouds,
                id: 802,
                translatedValue: 'Wolkig'
            },
            {
                group: WeatherGroup.Clouds,
                id: 803,
                translatedValue: 'stark bewölkt'
            },
            {
                group: WeatherGroup.Clouds,
                id: 804,
                translatedValue: 'bedeckt'
            }
        ];
    }

    getWeatherCondition(id: number): WeatherConditionElement | undefined {
        return this.conditions.find(weatherConditionElement => weatherConditionElement.id === id);
    }

    checkIs(weatherGroup: WeatherGroup, id: number):boolean {
        const condition = this.conditions.find(weatherConditionElement => (weatherConditionElement.id === id) && (weatherConditionElement.group === weatherGroup));
        if (condition) {
            return true;
        }
        return false;
    }

}