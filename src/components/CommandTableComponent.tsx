import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    ASSISTANT_WAKEUP_COMMAND,
    COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1,
    COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2,
    COMMAND_ACTIVATE_YOUTUBE_SEARCH,
    COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1,
    COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2,
    COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_1,
    COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_2,
    COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_3,
    COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_4,
    COMMAND_CLOSE_ALL_WINDOWS_1,
    COMMAND_CLOSE_ALL_WINDOWS_2,
    COMMAND_CLOSE_TAB_1,
    COMMAND_CLOSE_TAB_2,
    COMMAND_CLOSE_TAB_3,
    COMMAND_CLOSE_TAB_4,
    COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_CURRENT_WEATHER_BY_CITY,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2, COMMAND_DELETE_ALL_NOTES, COMMAND_DELETE_LAST_NOTE,
    COMMAND_DUPLICATE_1,
    COMMAND_DUPLICATE_2,
    COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_GO_BACK_1,
    COMMAND_GO_BACK_2,
    COMMAND_GO_BACK_3,
    COMMAND_GO_FORWARD_1,
    COMMAND_GO_FORWARD_2,
    COMMAND_GO_FORWARD_3,
    COMMAND_HOW_ARE_YOU,
    COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW,
    COMMAND_MOVE_TAB_TO_FIRST_POSITION,
    COMMAND_MOVE_TAB_TO_LAST_POSITION,
    COMMAND_MOVE_TAB_TO_LEFT_POSITION,
    COMMAND_MOVE_TAB_TO_NEW_WINDOW,
    COMMAND_MOVE_TAB_TO_RIGHT_POSITION,
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
    COMMAND_OPEN_TAB_1,
    COMMAND_OPEN_TAB_2,
    COMMAND_OPEN_TAB_3,
    COMMAND_OPEN_TAB_4,
    COMMAND_OPEN_TAB_5,
    COMMAND_OPEN_TAB_6,
    COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_1,
    COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_2,
    COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_3,
    COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_4,
    COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_1,
    COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_2,
    COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_3,
    COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_4,
    COMMAND_OPEN_WEBSITE_1,
    COMMAND_OPEN_WEBSITE_2,
    COMMAND_OPEN_YOUTUBE_PAGE,
    COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4, COMMAND_READ_LAST_THREE_NOTES,
    COMMAND_RELOAD_WEBSITE_1,
    COMMAND_RELOAD_WEBSITE_2,
    COMMAND_RELOAD_WEBSITE_3,
    COMMAND_RELOAD_WEBSITE_4, COMMAND_RELOAD_WEBSITE_5,
    COMMAND_RESET_1,
    COMMAND_RESET_2,
    COMMAND_RESET_3,
    COMMAND_SEARCH_1,
    COMMAND_SEARCH_2,
    COMMAND_SEARCH_ON_GOOGLE,
    COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH,
    COMMAND_START_NEXT_YOUTUBE_VIDEO,
    COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_TODAY_WEATHER_BY_CITY,
    COMMAND_UNMUTE_YOUTUBE_VIDEO,
    CommandType
} from "../models/command";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export function createTableData(command: string, example: string, commandType: CommandType, details: string) {
    let commandTypeAsString = '';
    if (commandType === CommandType.INTRODUCTION) commandTypeAsString = 'introduction'.toUpperCase();
    if (commandType === CommandType.WEATHER) commandTypeAsString = 'weather'.toUpperCase();
    if (commandType === CommandType.UTILITY) commandTypeAsString = 'utility'.toUpperCase();
    if (commandType === CommandType.YOUTUBE) commandTypeAsString = 'youtube'.toUpperCase();
    if (commandType === CommandType.BROWSER_CONTROL) commandTypeAsString = 'browser-control'.toUpperCase();
    if (commandType === CommandType.NOTE) commandTypeAsString = 'note'.toUpperCase();
    if (commandType === CommandType.GOOGLE) commandTypeAsString = 'google'.toUpperCase();
    return {command, example, commandTypeAsString, details};
}

const rows = [
    createTableData(COMMAND_HOW_ARE_YOU, 'wie geht es dir', CommandType.INTRODUCTION, '-'),
    createTableData(COMMAND_RESET_3, 'alles löschen', CommandType.UTILITY, 'Hilfsfunktion, dass das erkannte zurücksetzt'),
    createTableData(COMMAND_RESET_1, 'reset', CommandType.UTILITY, 'Alternativbefehl: Hilfsfunktion, dass das erkannte zurücksetzt'),
    createTableData(COMMAND_RESET_2, 'clear', CommandType.UTILITY, 'Alternativbefehl: Hilfsfunktion, dass das erkannte zurücksetzt'),

    createTableData(COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION, 'wie ist das aktuelle Wetter', CommandType.WEATHER, '-'),
    createTableData(COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION, 'wie wird das Wetter heute', CommandType.WEATHER, '-'),
    createTableData(COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION, 'wie wird das Wetter in den nächsten drei tagen', CommandType.WEATHER, '-'),
    createTableData(COMMAND_CURRENT_WEATHER_BY_CITY, 'wie ist das aktuelle Wetter in Hamburg', CommandType.WEATHER, '-'),
    createTableData(COMMAND_TODAY_WEATHER_BY_CITY, 'wie wird das Wetter heute in Hamburg', CommandType.WEATHER, '-'),

    createTableData(COMMAND_OPEN_YOUTUBE_PAGE, 'öffne youtube', CommandType.YOUTUBE, 'Öffnet ein neues Tab und lädt die Youtube Homepage'),
    createTableData(COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX, 'öffne video nummer 0', CommandType.YOUTUBE, 'Öffnet auf der Youtube-Homepage das gewählte Video. Dabei startet die Nummerierung bei der Zahl 0 von links oben nach rechts (Reihe für Reihe)'),
    createTableData(COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1, 'video stoppen', CommandType.YOUTUBE, 'Video wird pausiert'),
    createTableData(COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2, 'video pausieren', CommandType.YOUTUBE, 'Anternativbefehl: Video wird pausiert'),
    createTableData(COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3, 'video starten', CommandType.YOUTUBE, 'Video wird wieder abgespielt'),
    createTableData(COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4, 'video wiedergeben', CommandType.YOUTUBE, 'Alternativbefehl: Video wird wieder abgespielt'),
    createTableData(COMMAND_START_NEXT_YOUTUBE_VIDEO, 'nächstes Video (starten)\nnächstes Video', CommandType.YOUTUBE, 'Nächstes Video wird gestartet'),
    createTableData(COMMAND_MUTE_YOUTUBE_VIDEO_1, 'video stummschalten', CommandType.YOUTUBE, 'Video wird stummgestellt'),
    createTableData(COMMAND_MUTE_YOUTUBE_VIDEO_2, 'video stumm stellen', CommandType.YOUTUBE, 'Alternativbefehl: Video wird stummgestellt'),
    createTableData(COMMAND_UNMUTE_YOUTUBE_VIDEO, 'video laut stellen', CommandType.YOUTUBE, 'Video wird laut gestellt'),
    createTableData(COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_1, 'lautstärke auf 50% (stellen)', CommandType.YOUTUBE, 'Lautstärke verringern/erhöhen durch Prozentangaben zwischen 0% und 100%'),
    createTableData(COMMAND_CHANGE_VOLUME_ON_YOUTUBE_VIDEO_2, 'stelle lautstärke auf 100%', CommandType.YOUTUBE, 'Alternativbefehl: Lautstärke verringern/erhöhen durch Prozentangaben zwischen 0% und 100%'),
    createTableData(COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_1, 'aktiviere Kinomodus', CommandType.YOUTUBE, 'Aktiviert den Kinomodus'),
    createTableData(COMMAND_ACTIVATE_YOUTUBE_CINEMA_MODE_2, 'Kinomodus starten', CommandType.YOUTUBE, 'Alternativbefehl: Aktiviert den Kinomodus'),
    createTableData(COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1, 'deaktiviere Kinomodus', CommandType.YOUTUBE, 'Kinomodus deaktivieren'),
    createTableData(COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2, 'Kinomodus beenden', CommandType.YOUTUBE, 'Alternativbefehl: Kinomodus deaktivieren'),
    createTableData(COMMAND_ACTIVATE_YOUTUBE_SEARCH, 'Suche aktivieren', CommandType.YOUTUBE, 'Suche wird aktiviert. Eingabe von Daten über Sprache'),


    createTableData(COMMAND_OPEN_GOOGLE, 'öffne Google', CommandType.GOOGLE, 'Öffnet die Website google.de'),
    createTableData(COMMAND_SEARCH_ON_GOOGLE, 'such auf google nach katzen', CommandType.GOOGLE, 'benutzt die geöffnete Google-Website, um eine Suche zu starten'),
    createTableData(COMMAND_SEARCH_ON_GOOGLE_AFTER_SEARCH, 'neue suche auf google nach hunden', CommandType.GOOGLE, 'erlaubt eine weitere suche nach dem einmal gesucht worden ist'),
    createTableData(COMMAND_OPEN_GOOGLE_IMAGE_RESULT_1, 'öffne bilder ergebnisse', CommandType.GOOGLE, 'öffnet die Bilderergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_IMAGE_RESULT_2, 'zeige bilder ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Bilderergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_IMAGE_RESULT_3, 'öffne Reiter Bildere', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Bilderergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_1, 'zeige video ergebnisse', CommandType.GOOGLE, 'öffnet die Videorergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_2, 'öffne video ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Videorergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_VIDEOS_RESULT_3, 'öffne Reiter Videos', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Videorergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_1, 'öffne shopping ergebnisse', CommandType.GOOGLE, 'öffnet die Shoppingrergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_2, 'zeige shopping ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Shoppingrergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_SHOPPING_RESULT_3, 'öffne Reiter Shopping', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Shoppingrergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_NEWS_RESULT_1, 'zeige nachrichten ergebnisse', CommandType.GOOGLE, 'öffnet die  Nachrichtenergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_NEWS_RESULT_2, 'öffne nachrichten ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Nachrichtenergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_NEWS_RESULT_3, 'öffne Reiter News', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Nachrichtenergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_ALL_RESULT_1, 'zeige alle ergebnisse', CommandType.GOOGLE, 'öffnet alle energebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_ALL_RESULT_2, 'öffne alle ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet alle energebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_ALL_RESULT_3, 'öffne Reiter Alle', CommandType.GOOGLE, 'Alternativbefehl: öffnet alle energebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_MAPS_RESULT_1, 'zeige maps ergebnisse', CommandType.GOOGLE, 'öffnet die Mapsergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_MAPS_RESULT_2, 'öffne maps ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Mapsergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_MAPS_RESULT_3, 'öffne Reiter Maps', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Mapsergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_BOOK_RESULT_1, 'zeige bücher ergebnisse', CommandType.GOOGLE, 'öffnet die Bücherergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_BOOK_RESULT_2, 'öffne bücher ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Bücherergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_BOOK_RESULT_3, 'öffne Reiter Bücher', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Bücherergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_FINANCE_RESULT_1, 'zeige finanz ergebnisse', CommandType.GOOGLE, 'öffnet die Finanzergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_FINANCE_RESULT_2, 'öffne finanz ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Finanzergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_FINANCE_RESULT_3, 'öffne Reiter Finanzen', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Finanzergebnisse'),

    createTableData(COMMAND_OPEN_GOOGLE_FLY_RESULT_1, 'zeige Flug ergebnisse', CommandType.GOOGLE, 'öffnet die Flugergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_FLY_RESULT_2, 'öffne Flug ergebnisse', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Flugergebnisse'),
    createTableData(COMMAND_OPEN_GOOGLE_FLY_RESULT_3, 'öffne Reiter Flüge', CommandType.GOOGLE, 'Alternativbefehl: öffnet die Flugergebnisse'),

    createTableData(COMMAND_OPEN_GMAIL_ON_GOOGLE_HOMEPAGE, 'öffne Gmail', CommandType.GOOGLE, 'öffnet Gmail auf der Homepage von Google'),

    createTableData(COMMAND_OPEN_WEBSITE_1, 'öffne die website facebook.com', CommandType.BROWSER_CONTROL, 'öffnet eine Website'),
    createTableData(COMMAND_OPEN_WEBSITE_2, 'öffne die webseite facebook.com', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet eine Website'),

    createTableData(COMMAND_GO_BACK_1, 'seite zurückspringen', CommandType.BROWSER_CONTROL, 'Springt eine Website zurück'),
    createTableData(COMMAND_GO_BACK_2, 'zurück', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Springt eine Website zurück'),
    createTableData(COMMAND_GO_BACK_3, 'springe eine seite zurück', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Springt eine Website zurück'),

    createTableData(COMMAND_GO_FORWARD_1, 'seite vorwärts', CommandType.BROWSER_CONTROL, 'Springt eine Website vorwärts'),
    createTableData(COMMAND_GO_FORWARD_2, 'vorwärts', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Springt eine Website vorwärts'),
    createTableData(COMMAND_GO_FORWARD_3, 'springe eine seite vor', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Springt eine Website vorwärts'),

    createTableData(COMMAND_DUPLICATE_1, 'Seite duplizieren', CommandType.BROWSER_CONTROL, 'kopiert das aktuelle tab in einem neuen tab'),
    createTableData(COMMAND_DUPLICATE_2, 'Seite kopieren', CommandType.BROWSER_CONTROL, 'Alternativbefehl: kopiert das aktuelle tab in einem neuen tab'),

    createTableData(COMMAND_MOVE_TAB_TO_FIRST_POSITION, 'Tab zum Anfang bewegen', CommandType.BROWSER_CONTROL, 'Tab zum Anfang bewegen'),
    createTableData(COMMAND_MOVE_TAB_TO_LAST_POSITION, 'Tab zum Ende bewegen', CommandType.BROWSER_CONTROL, 'Tab zum Ende bewegen'),
    createTableData(COMMAND_MOVE_TAB_TO_LEFT_POSITION, 'Tab nach links bewegen', CommandType.BROWSER_CONTROL, 'Tab nach links bewegen'),

    createTableData(COMMAND_MOVE_TAB_TO_RIGHT_POSITION, 'Tab nach rechts bewegen', CommandType.BROWSER_CONTROL, 'Tab nach rechts bewegen'),
    createTableData(COMMAND_MOVE_TAB_TO_NEW_WINDOW, 'Tab in ein neues Fenster bewegen', CommandType.BROWSER_CONTROL, 'Tab in ein neues Fenster bewegen'),
    createTableData(COMMAND_MOVE_ALL_TABS_TO_NEW_WINDOW, 'alle Tabs zusammenfügen', CommandType.BROWSER_CONTROL, 'alle Tabs zusammenfügen in einem Fenster'),

    createTableData(COMMAND_OPEN_TAB_1, 'öffne tab nummer 0', CommandType.BROWSER_CONTROL, 'öffnet Tab mit der jeweiligen Position'),
    createTableData(COMMAND_OPEN_TAB_2, 'öffne tab mit der nummer 0', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet Tab mit der jeweiligen Position'),
    createTableData(COMMAND_OPEN_TAB_3, 'tab mit der nummer 0 öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet Tab mit der jeweiligen Position'),
    createTableData(COMMAND_OPEN_TAB_4, 'öffne registerkarte mit der nummer 0', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet Tab mit der jeweiligen Position'),
    createTableData(COMMAND_OPEN_TAB_5, 'öffne registerkarte nummer 0', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet Tab mit der jeweiligen Position'),
    createTableData(COMMAND_OPEN_TAB_6, 'registerkarte mit der nummer 0 öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet Tab mit der jeweiligen Position'),

    createTableData(COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_1, 'öffne linke registerkarte', CommandType.BROWSER_CONTROL, 'öffnet linke registerkarte'),
    createTableData(COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_2, 'öffne linken tab', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet linke registerkarte'),
    createTableData(COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_3, 'linken tab öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet linke registerkarte'),
    createTableData(COMMAND_OPEN_TAB_LEFT_FROM_ACTIVE_TAB_4, 'registerkarte links öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet linke registerkarte'),

    createTableData(COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_1, 'öffne rechte registerkarte', CommandType.BROWSER_CONTROL, 'öffnet rechte registerkarte'),
    createTableData(COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_2, 'öffne rechten tab', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet rechte registerkarte'),
    createTableData(COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_3, 'rechten tab öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl:öffnet rechte registerkarte'),
    createTableData(COMMAND_OPEN_TAB_RIGHT_FROM_ACTIVE_TAB_4, 'registerkarte rechts öffnen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: öffnet rechte registerkarte'),


    createTableData(COMMAND_CLOSE_TAB_1, 'tab schließen', CommandType.BROWSER_CONTROL, 'schließt registerkarte'),
    createTableData(COMMAND_CLOSE_TAB_2, 'registerkarte schließen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: schließt registerkarte'),
    createTableData(COMMAND_CLOSE_TAB_3, 'schließe registerkarte', CommandType.BROWSER_CONTROL, 'Alternativbefehl:schließt registerkarte'),
    createTableData(COMMAND_CLOSE_TAB_4, 'schließe den tab', CommandType.BROWSER_CONTROL, 'Alternativbefehl:öffnet rechte registerkarte'),

    createTableData(COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_1, 'schließe alle tabs', CommandType.BROWSER_CONTROL, 'schließt alle registerkarten'),
    createTableData(COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_2, 'schließe alle registerkarten', CommandType.BROWSER_CONTROL, 'Alternativbefehl: schließt alle registerkarten'),
    createTableData(COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_3, 'alle registerkarten schließen', CommandType.BROWSER_CONTROL, 'Alternativbefehl:schließt alle registerkarten'),
    createTableData(COMMAND_CLOSE_ALL_TABS_IN_CURRENT_WINDOW_4, 'alle tabs schließen', CommandType.BROWSER_CONTROL, 'Alternativbefehl:schließt alle registerkarten'),

    createTableData(COMMAND_CLOSE_ALL_WINDOWS_1, 'alle fenster schließen', CommandType.BROWSER_CONTROL, 'schließt alle fenster'),
    createTableData(COMMAND_CLOSE_ALL_WINDOWS_2, 'schließe alle fenster', CommandType.BROWSER_CONTROL, 'Alternativbefehl:schließt alle fenster'),

    createTableData(COMMAND_SEARCH_1, 'suche nach katzen', CommandType.BROWSER_CONTROL, 'benutzt die Standardsuchmaschine'),
    createTableData(COMMAND_SEARCH_2, 'nach katzen suchen', CommandType.BROWSER_CONTROL, 'Alternativbefehl: benutzt die Standardsuchmaschine'),

    createTableData(COMMAND_RELOAD_WEBSITE_1, 'seite neu laden', CommandType.BROWSER_CONTROL, 'Website neuladen'),
    createTableData(COMMAND_RELOAD_WEBSITE_2, 'tab neu laden', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Website neuladen'),
    createTableData(COMMAND_RELOAD_WEBSITE_3, 'registerkarte neu laden', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Website neuladen'),
    createTableData(COMMAND_RELOAD_WEBSITE_4, 'Website neu laden', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Website neuladen'),
    createTableData(COMMAND_RELOAD_WEBSITE_5, 'Webseite neu laden', CommandType.BROWSER_CONTROL, 'Alternativbefehl: Website neuladen'),

    createTableData(COMMAND_DELETE_LAST_NOTE, 'letzte Notiz löschen', CommandType.NOTE, 'löscht die zuletzt hinzugefügte Notiz'),
    createTableData(COMMAND_DELETE_ALL_NOTES, 'lösche alle Notizen', CommandType.NOTE, 'löscht alle Notizen'),
    createTableData(COMMAND_READ_LAST_THREE_NOTES, 'lies meine letzten drei Notizen vor', CommandType.NOTE, 'liest die letzten drei Notizen vor'),


];

export function CommandTable() {
    return (
        <Paper>
            <Box padding={'1rem'}>
                <Box paddingBottom={'1rem'}>
                    <Typography color={"secondary"} fontSize={'1.5rem'}>
                        Jeder Befehl startet mit diesen Worten: {ASSISTANT_WAKEUP_COMMAND}
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table stickyHeader sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Typ</TableCell>
                                <TableCell align="left">Befehl</TableCell>
                                <TableCell align="left">Beispiel</TableCell>
                                <TableCell align="left">Bemerkung</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.command}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{row.commandTypeAsString}</TableCell>
                                    <TableCell align="left">{row.command}</TableCell>
                                    <TableCell align="left">{row.example}</TableCell>
                                    <TableCell align="left">{row.details}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}
