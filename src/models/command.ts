// recognition specific
export const ASSISTANT_NAME = 'nami';
export const ASSISTANT_WAKEUP_COMMAND = `Hallo ${ASSISTANT_NAME}`;

// commands
//introduction
export const COMMAND_HOW_ARE_YOU = `${ASSISTANT_WAKEUP_COMMAND} wie geht es dir`;

// Utility
export const COMMAND_RESET_1 = `reset`;
export const COMMAND_RESET_2 = `clear`;
export const COMMAND_RESET_3 = `alles löschen`;

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
export const COMMAND_SEARCH_ON_GOOGLE = `${ASSISTANT_WAKEUP_COMMAND} suche auf google nach *`;
export const COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH = `${ASSISTANT_WAKEUP_COMMAND} neue suche auf google nach *`;
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

export const COMMAND_GO_BACK_1 = `${ASSISTANT_WAKEUP_COMMAND} seite zurückspringen`;
export const COMMAND_GO_BACK_2 = `${ASSISTANT_WAKEUP_COMMAND} zurück`;
export const COMMAND_GO_BACK_3 = `${ASSISTANT_WAKEUP_COMMAND} springe eine seite zurück`;
export const COMMAND_GO_FORWARD_1 = `${ASSISTANT_WAKEUP_COMMAND} seite vorwärts`;
export const COMMAND_GO_FORWARD_2 = `${ASSISTANT_WAKEUP_COMMAND} vorwärts`;
export const COMMAND_GO_FORWARD_3 = `${ASSISTANT_WAKEUP_COMMAND} springe eine seite vor`;

export const COMMAND_DUPLICATE_1 = `${ASSISTANT_WAKEUP_COMMAND} Seite duplizieren`;
export const COMMAND_DUPLICATE_2 = `${ASSISTANT_WAKEUP_COMMAND} Seite kopieren`;

export const COMMAND_MOVE_TAB_TO_FIRST_POSITION = `${ASSISTANT_WAKEUP_COMMAND} Tab zum Anfang bewegen`;
export const COMMAND_MOVE_TAB_TO_LAST_POSITION = `${ASSISTANT_WAKEUP_COMMAND} Tab zum Ende bewegen`;
export const COMMAND_MOVE_TAB_TO_LEFT_POSITION = `${ASSISTANT_WAKEUP_COMMAND} Tab nach links bewegen`;
export const COMMAND_MOVE_TAB_TO_RIGHT_POSITION = `${ASSISTANT_WAKEUP_COMMAND} Tab nach rechts bewegen`;
export const COMMAND_MOVE_TAB_TO_NEW_WINDOW = `${ASSISTANT_WAKEUP_COMMAND} Tab in ein neues Fenster bewegen`;
export const COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW = `${ASSISTANT_WAKEUP_COMMAND} alle Tabs zusammenfügen`;

export const COMMAND_OPEN_TAB_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne tab nummer :index`;
export const COMMAND_OPEN_TAB_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne tab mit der nummer :index`;
export const COMMAND_OPEN_TAB_3 = `${ASSISTANT_WAKEUP_COMMAND} tab mit der nummer :index öffnen`;
export const COMMAND_OPEN_TAB_4 = `${ASSISTANT_WAKEUP_COMMAND} öffne registerkarte mit der nummer :index`;
export const COMMAND_OPEN_TAB_5 = `${ASSISTANT_WAKEUP_COMMAND} öffne registerkarte nummer :index`;
export const COMMAND_OPEN_TAB_6 = `${ASSISTANT_WAKEUP_COMMAND} registerkarte mit der nummer :index öffnen`;

export const COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne linke registerkarte`;
export const COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne linken tab`;
export const COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_3 = `${ASSISTANT_WAKEUP_COMMAND} linken tab öffnen`;
export const COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_4 = `${ASSISTANT_WAKEUP_COMMAND} registerkarte links öffnen`;
export const COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_1 = `${ASSISTANT_WAKEUP_COMMAND} öffne rechte registerkarte`;
export const COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_2 = `${ASSISTANT_WAKEUP_COMMAND} öffne rechten tab`;
export const COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_3 = `${ASSISTANT_WAKEUP_COMMAND} rechten tab öffnen`;
export const COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_4 = `${ASSISTANT_WAKEUP_COMMAND} registerkarte rechts öffnen`;

export const COMMAND_CLOSE_TAB_1 = `${ASSISTANT_WAKEUP_COMMAND} tab schließen`;
export const COMMAND_CLOSE_TAB_2 = `${ASSISTANT_WAKEUP_COMMAND} registerkarte schließen`;
export const COMMAND_CLOSE_TAB_3 = `${ASSISTANT_WAKEUP_COMMAND} schließe registerkarte`;
export const COMMAND_CLOSE_TAB_4 = `${ASSISTANT_WAKEUP_COMMAND} schließe den tab`;
export const COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_1 = `${ASSISTANT_WAKEUP_COMMAND} schließe alle tabs`;
export const COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_2 = `${ASSISTANT_WAKEUP_COMMAND} schließe alle registerkarten`;
export const COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_3 = `${ASSISTANT_WAKEUP_COMMAND} alle registerkarten schließen`;
export const COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_4 = `${ASSISTANT_WAKEUP_COMMAND} alle tabs schließen`;
export const COMMAND_CLOSE_ALL_WINDOWS_1 = `${ASSISTANT_WAKEUP_COMMAND} alle fenster schließen`;
export const COMMAND_CLOSE_ALL_WINDOWS_2 = `${ASSISTANT_WAKEUP_COMMAND} schließe alle fenster`;


// search with the standard search engine
export const COMMAND_SEARCH_1 = `${ASSISTANT_WAKEUP_COMMAND} suche nach *`;
export const COMMAND_SEARCH_2 = `${ASSISTANT_WAKEUP_COMMAND} nach * suchen`;


// reload a website
export const COMMAND_RELOAD_WEBSITE_1 = `${ASSISTANT_WAKEUP_COMMAND} seite neu laden`;
export const COMMAND_RELOAD_WEBSITE_2 = `${ASSISTANT_WAKEUP_COMMAND} tab neu laden`;
export const COMMAND_RELOAD_WEBSITE_3 = `${ASSISTANT_WAKEUP_COMMAND} registerkarte neu laden`;
export const COMMAND_RELOAD_WEBSITE_4 = `${ASSISTANT_WAKEUP_COMMAND} Website neu laden`;
export const COMMAND_RELOAD_WEBSITE_5 = `${ASSISTANT_WAKEUP_COMMAND} Webseite neu laden`;

// notes
export const COMMAND_DELETE_LAST_NOTE = `${ASSISTANT_WAKEUP_COMMAND} letzte Notiz löschen`;
export const COMMAND_DELETE_ALL_NOTES = `${ASSISTANT_WAKEUP_COMMAND} lösche alle Notizen`;
export const COMMAND_READ_LAST_THREE_NOTES = `${ASSISTANT_WAKEUP_COMMAND} lies meine letzten drei Notizen vor`;


export enum CommandType {
    INTRODUCTION,
    UTILITY,
    WEATHER,
    YOUTUBE,
    GOOGLE,
    BROWSER_CONTROL,
    NOTE
}

