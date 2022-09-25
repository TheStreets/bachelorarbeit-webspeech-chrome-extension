// export enum WeatherGroup {
//     ThunderStorm,
//     Drizzle,
//     Rain,
//     Snow,
//     Clear,
//     Clouds,
//     Mist,
//     Smoke,
//     Haze,
//     Dust,
//     Fog,
//     Sand,
//     Ash,
//     Squall,
//     Tornado
// }
//
// interface WeatherCondition {
//     group: WeatherGroup;
//     id: number;
//     translatedValue: string;
// }
//
// export class ThunderStorm {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 200,
//             translatedValue: 'Gewitter mit leichtem Regen'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 201,
//             translatedValue: 'Gewitter mit Regen'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 202,
//             translatedValue: 'Gewitter mit Starkregen'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 210,
//             translatedValue: 'leichtes Gewitter'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 211,
//             translatedValue: 'Gewitter'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 212,
//             translatedValue: 'schweres Gewitter'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 221,
//             translatedValue: 'Gewitter'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 230,
//             translatedValue: 'Gewitter mit leichtem Nieselregen'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 231,
//             translatedValue: 'Gewitter mit Nieselregen'
//         },
//         {
//             group: WeatherGroup.ThunderStorm,
//             id: 232,
//             translatedValue: 'Gewitter mit starkem Nieselregen'
//         }
//     ]
// }
//
// export class Drizzle {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Drizzle,
//             id: 300,
//             translatedValue: 'leichter Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 301,
//             translatedValue: 'Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 302,
//             translatedValue: 'starker Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 310,
//             translatedValue: 'leichter Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 311,
//             translatedValue: 'leichter Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 312,
//             translatedValue: 'starker Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 313,
//             translatedValue: 'Regenschauer und Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 314,
//             translatedValue: 'heftiger Regenschauer und Nieselregen'
//         },
//         {
//             group: WeatherGroup.Drizzle,
//             id: 321,
//             translatedValue: 'Regenschauer und Nieselregen'
//         },
//
//     ]
// }
//
// export class Rain {
//     conditions = [
//         {
//             group: WeatherGroup.Rain,
//             id: 500,
//             translatedValue: 'Leichter Regen'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 501,
//             translatedValue: 'Moderater Regen'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 502,
//             translatedValue: 'Starker Regen'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 503,
//             translatedValue: 'Sehr starker Regen'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 504,
//             translatedValue: 'Extremer Regen'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 511,
//             translatedValue: 'Blitzeis'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 520,
//             translatedValue: 'Leichter Regenschauer'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 521,
//             translatedValue: 'Regenschauer'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 522,
//             translatedValue: 'starker Regenschauer'
//         },
//         {
//             group: WeatherGroup.Rain,
//             id: 531,
//             translatedValue: 'Schauerartiger Regen'
//         },
//
//     ]
// }
//
// export class Snow {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Snow,
//             id: 600,
//             translatedValue: 'leichter Schnee'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 601,
//             translatedValue: 'Schnee'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 602,
//             translatedValue: 'Starker Schneefall'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 611,
//             translatedValue: 'Schneeregen'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 612,
//             translatedValue: 'Leichter Schneeregen'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 613,
//             translatedValue: 'Schneeregen'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 615,
//             translatedValue: 'Leichter Regen und Schnee'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 616,
//             translatedValue: 'Regen und Schnee'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 620,
//             translatedValue: 'Leichter Schneeregen'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 621,
//             translatedValue: 'Schneeregen'
//         },
//         {
//             group: WeatherGroup.Snow,
//             id: 622,
//             translatedValue: 'Starker Schneeregen'
//         },
//     ]
// }
//
// export class Mist {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Mist,
//             id: 701,
//             translatedValue: 'Nebel'
//         },
//     ]
// }
//
// export class Smoke {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Smoke,
//             id: 711,
//             translatedValue: 'Rauch'
//         },
//     ]
// }
//
// export class Haze {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Haze,
//             id: 721,
//             translatedValue: 'Dunst'
//         },
//     ]
// }
//
// export class Dust {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Dust,
//             id: 731,
//             translatedValue: 'Sand-/Staubwirbel'
//         },
//         {
//             group: WeatherGroup.Dust,
//             id: 761,
//             translatedValue: 'Staubig'
//         },
//     ]
// }
//
// export class Fog {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Fog,
//             id: 741,
//             translatedValue: 'Nebel'
//         },
//     ]
// }
//
// export class Sand {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Sand,
//             id: 751,
//             translatedValue: 'Sand'
//         },
//     ]
// }
//
// export class Ash {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Ash,
//             id: 762,
//             translatedValue: 'Vulkanasche'
//         },
//     ]
// }
//
// export class Squall {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Squall,
//             id: 771,
//             translatedValue: 'Sturmböen'
//         },
//     ]
// }
//
// export class Tornado {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Tornado,
//             id: 781,
//             translatedValue: 'Tornado'
//         },
//     ]
// }
//
// export class Clear {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Clear,
//             id: 800,
//             translatedValue: 'klarer Himmel'
//         }
//     ]
// }
//
// export class Clouds {
//     conditions: WeatherCondition[] = [
//         {
//             group: WeatherGroup.Clouds,
//             id: 801,
//             translatedValue: 'leicht bewölkt'
//         },
//         {
//             group: WeatherGroup.Clouds,
//             id: 802,
//             translatedValue: 'Wolkig'
//         },
//         {
//             group: WeatherGroup.Clouds,
//             id: 803,
//             translatedValue: 'stark bewölkt'
//         },
//         {
//             group: WeatherGroup.Clouds,
//             id: 804,
//             translatedValue: 'bedeckt'
//         }
//     ]
// }



// export interface Weather {
//     lat: number;
//     lon: number;
//     timezone: string;
//     timezone_offset: number;
//     current: {
//         clouds: number;
//         dew_point: number;
//         dt: number;
//         feels_like: number;
//         humidity: number;
//         pressure: number;
//         sunrise: number;
//         sunset: number;
//         temp: number;
//         uvi: number;
//         visibility: number;
//         weather: [
//             {
//                 id: number;
//                 main: string;
//                 description: string;
//                 icon: string;
//             }
//         ]
//         wind_deg: number;
//         wind_gust: number;
//         wind_speed: number;
//     }
//     minutely: [
//         {
//             dt: number,
//             precipitation: number
//         }
//     ]
//     hourly: [
//         {
//             dt: number;
//             temp: number;
//             feels_like: number;
//             pressure: number;
//             humidity: number;
//             dew_point: number;
//             uvi: number;
//             clouds: number;
//             visibility: number;
//             wind_speed: number;
//             wind_deg: number;
//             wind_gust: number;
//             weather: [
//                 {
//                     id: number;
//                     main: string;
//                     description: string;
//                     icon: string;
//                 }
//             ],
//             pop: number;
//         },
//     ]
//     daily: [
//         {
//             clouds: number;
//             dew_point: number;
//             dt: number;
//             feels_like: {
//                 day: number;
//                 night: number;
//                 eve: number;
//                 morn: number;
//             }
//             humidity: number;
//             moon_phase: number;
//             moonrise: number;
//             moonset: number;
//             pop: number;
//             pressure: number;
//             rain: number;
//             sunrise: number;
//             sunset: number;
//             temp: {
//                 day: number;
//                 min: number;
//                 max: number;
//                 night: number;
//                 eve: number;
//             }
//             uvi: number;
//             weather: [
//                 {
//                     id: number;
//                     main: string;
//                     description: string;
//                     icon: string;
//                 }
//             ]
//             wind_deg: number;
//             wind_gust: number;
//             wind_speed: number;
//         }
//     ]
// }


export interface Weather {
    lat:             number;
    lon:             number;
    timezone:        string;
    timezone_offset: number;
    current:         Current;
    minutely:        Minutely[];
    daily:           Daily[];
}

export interface Current {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    temp:       number;
    feels_like: number;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    uvi:        number;
    clouds:     number;
    visibility: number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    WeatherElement[];
}

export interface WeatherElement {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Daily {
    dt:         number;
    sunrise:    number;
    sunset:     number;
    moonrise:   number;
    moonset:    number;
    moon_phase: number;
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
    dew_point:  number;
    wind_speed: number;
    wind_deg:   number;
    wind_gust:  number;
    weather:    WeatherElement[];
    clouds:     number;
    pop:        number;
    uvi:        number;
}

export interface FeelsLike {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Temp {
    day:   number;
    min:   number;
    max:   number;
    night: number;
    eve:   number;
    morn:  number;
}

export interface Minutely {
    dt:            number;
    precipitation: number;
}