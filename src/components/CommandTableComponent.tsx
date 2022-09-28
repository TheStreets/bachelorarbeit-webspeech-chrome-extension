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
    Command,
    COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_CURRENT_WEATHER_BY_CITY,
    COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION,
    COMMAND_HOW_ARE_YOU,
    COMMAND_RESET,
    COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION, COMMAND_TODAY_WEATHER_BY_CITY,
    CommandType
} from "../models/command";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export function createTableData(command: string, example: string, commandType: CommandType): Command {
    return {command, example, commandType};
}


const rows = [
    createTableData(COMMAND_HOW_ARE_YOU, 'wie geht es dir', CommandType.INTRODUCTION),
    createTableData(COMMAND_RESET, 'reset', CommandType.UTILITY),
    createTableData(COMMAND_CURRENT_WEATHER_BY_BROWSER_LOCATION, 'wie ist das aktuelle Wetter', CommandType.WEATHER),
    createTableData(COMMAND_TODAY_WEATHER_BY_BROWSER_LOCATION, 'wie wird das Wetter heute', CommandType.WEATHER),
    createTableData(COMMAND_FORCAST_WEATHER_BY_BROWSER_LOCATION, 'wie wird das Wetter in den nächsten drei tagen', CommandType.WEATHER),
    createTableData(COMMAND_CURRENT_WEATHER_BY_CITY, 'wie ist das aktuelle Wetter in Hamburg', CommandType.WEATHER),
    createTableData(COMMAND_TODAY_WEATHER_BY_CITY, 'wie wird das Wetter heute in Hamburg', CommandType.WEATHER),
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.command}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                    <TableCell component="th" scope="row">{row.commandType}</TableCell>
                                    <TableCell align="left">{row.command}</TableCell>
                                    <TableCell align="left">{row.example}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Paper>
    );
}
