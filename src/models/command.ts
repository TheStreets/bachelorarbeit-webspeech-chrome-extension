// recognition specific
export const ASSISTANT_NAME = 'nami';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;

// commands
//introduction
export const COMMAND_HOW_ARE_YOU = `${ASSISTANT_WAKEUP_COMMAND} wie geht es dir`;
// Utility
export const COMMAND_RESET = `reset`;
// Weather
export const COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter`;
export const COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute`;
export const COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter in den nächsten drei tagen`;
export const COMMAND_CURRENT_WEATHER_BY_CITY = `${ASSISTANT_WAKEUP_COMMAND} wie ist das aktuelle Wetter in *`;
export const COMMAND_TODAY_WEATHER_BY_CITY = `${ASSISTANT_WAKEUP_COMMAND} wie wird das Wetter heute in *`;

// youtube
export const COMMAND_OPEN_YOUTUBE_PAGE = `${ASSISTANT_WAKEUP_COMMAND} öffne youtube`;
export const COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX = `${ASSISTANT_WAKEUP_COMMAND} öffne video nummer :selectedVideo`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} video stoppen`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} video pausieren`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3 = `${ASSISTANT_WAKEUP_COMMAND} video starten`;
export const COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4 = `${ASSISTANT_WAKEUP_COMMAND} video wiedergeben`;
export const COMMAND_START_NEXT_YOUTUBE_VIDEO = `${ASSISTANT_WAKEUP_COMMAND} nächstes Video (starten)`;
export const COMMAND_MUTE_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} video stummschalten`;
export const COMMAND_MUTE_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} video stumm stellen`;
export const COMMAND_UNMUTE_YOUTUBE_VIDEO = `${ASSISTANT_WAKEUP_COMMAND} video laut stellen`;
export const COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1 = `${ASSISTANT_WAKEUP_COMMAND} lautstärke auf * (stellen)`;
export const COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2 = `${ASSISTANT_WAKEUP_COMMAND} stelle lautstärke auf *`;
export const COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1 = `${ASSISTANT_WAKEUP_COMMAND} aktiviere Kinomodus`;
export const COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2 = `${ASSISTANT_WAKEUP_COMMAND} Kinomodus starten`;
export const COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1 = `${ASSISTANT_WAKEUP_COMMAND} deaktiviere Kinomodus`;
export const COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2 = `${ASSISTANT_WAKEUP_COMMAND} Kinomodus beenden`;
export const COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN_1 = `${ASSISTANT_WAKEUP_COMMAND} aktiviere Vollbildschirm`;
export const COMMAND_ACTIVATE_YOUTUBE_FULLSCREEN_2 = `${ASSISTANT_WAKEUP_COMMAND} Vollbildschirm aktivieren`;
export const COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN_1 = `${ASSISTANT_WAKEUP_COMMAND} deaktiviere Vollbildschirm`;
export const COMMAND_DEACTIVATE_YOUTUBE_FULLSCREEN_2 = `${ASSISTANT_WAKEUP_COMMAND} Vollbildschirm beenden`;
export const COMMAND_ACTIVATE_YOUTUBE_SEARCH = `${ASSISTANT_WAKEUP_COMMAND} Suche aktivieren`;

// google
export const COMMAND_OPEN_GOOGLE = `${ASSISTANT_WAKEUP_COMMAND} öffne Google`;
export const COMMAND_SEARCH_ON_GOOGLE = `${ASSISTANT_WAKEUP_COMMAND} suche nach *`;
export const COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH = `${ASSISTANT_WAKEUP_COMMAND} neue suche nach *`;
export const COMMAND_OPEN_GOOGLE_IMAGE_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne bilder ergebnisse`;
export const COMMAND_OPEN_GOOGLE_IMAGE_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} zeige bilder ergebnisse`;
export const COMMAND_OPEN_GOOGLE_IMAGE_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Bilder`;
export const COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige video ergebnisse`;
export const COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne video ergebnisse`;
export const COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Videos`;
export const COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne shopping ergebnisse`;
export const COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} zeige shopping ergebnisse`;
export const COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Shopping`;
export const COMMAND_OPEN_GOOGLE_NEWS_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige nachrichten ergebnisse`;
export const COMMAND_OPEN_GOOGLE_NEWS_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne nachrichten ergebnisse`;
export const COMMAND_OPEN_GOOGLE_NEWS_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter News`;
export const COMMAND_OPEN_GOOGLE_ALL_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige alle ergebnisse`;
export const COMMAND_OPEN_GOOGLE_ALL_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne alle ergebnisse`;
export const COMMAND_OPEN_GOOGLE_ALL_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Alle`;
export const COMMAND_OPEN_GOOGLE_MAPS_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige maps ergebnisse`;
export const COMMAND_OPEN_GOOGLE_MAPS_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne maps ergebnisse`;
export const COMMAND_OPEN_GOOGLE_MAPS_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Maps`;
export const COMMAND_OPEN_GOOGLE_BOOK_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige bücher ergebnisse`;
export const COMMAND_OPEN_GOOGLE_BOOK_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne bücher ergebnisse`;
export const COMMAND_OPEN_GOOGLE_BOOK_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Bücher`;
export const COMMAND_OPEN_GOOGLE_FINANCE_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige finanz ergebnisse`;
export const COMMAND_OPEN_GOOGLE_FINANCE_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne finanz ergebnisse`;
export const COMMAND_OPEN_GOOGLE_FINANCE_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Finanzen`;
export const COMMAND_OPEN_GOOGLE_FLY_RESULT_1 = `${ASSISTANT_WAKEUP_COMMAND} zeige Flug ergebnisse`;
export const COMMAND_OPEN_GOOGLE_FLY_RESULT_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne Flug ergebnisse`;
export const COMMAND_OPEN_GOOGLE_FLY_RESULT_3 = `${ASSISTANT_WAKEUP_COMMAND} öffne Reiter Flüge`;
export const COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE = `${ASSISTANT_WAKEUP_COMMAND} öffne Gmail`;


// browser control
export const COMMAND_OPEN_WEBSITE_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne die website *`;
export const COMMAND_OPEN_WEBSITE_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne die webseite *`;

export enum CommandType {
    INTRODUCTION,
    UTILITY,
    WEATHER,
    YOUTUBE
}

