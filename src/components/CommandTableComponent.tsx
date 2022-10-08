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
    COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_CURRENT_WEATHER_BY_CITY,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_1,
    COMMAND_DEACTIVATE_YOUTUBE_CINEMA_MODE_2,
    COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_HOW_ARE_YOU,
    COMMAND_MUTE_YOUTUBE_VIDEO_1,
    COMMAND_MUTE_YOUTUBE_VIDEO_2,
    COMMAND_OPEN_YOUTUBE_PAGE,
    COMMAND_OPEN_YOUTUBE_VIDEO_VIA_INDEX,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_1,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_2,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_3,
    COMMAND_PAUSE_PLAY_YOUTUBE_VIDEO_4,
    COMMAND_RESET_1,
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
    if(commandType === CommandType.INTRODUCTION) commandTypeAsString = 'introduction'.toUpperCase();
    if(commandType === CommandType.WEATHER) commandTypeAsString = 'weather'.toUpperCase();
    if(commandType === CommandType.UTILITY) commandTypeAsString = 'utility'.toUpperCase();
    if(commandType === CommandType.YOUTUBE) commandTypeAsString = 'youtube'.toUpperCase();
    return {command, example, commandTypeAsString, details};
}

const rows = [
    createTableData(COMMAND_HOW_ARE_YOU, 'wie geht es dir', CommandType.INTRODUCTION, '-'),
    createTableData(COMMAND_RESET_1, 'reset', CommandType.UTILITY, 'Hilfsfunktion, dass das erkannte zurücksetzt'),
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
