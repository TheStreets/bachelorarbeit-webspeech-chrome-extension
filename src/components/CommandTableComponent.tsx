import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Command, CommandType} from "../models/command";


export function createTableData(command: string, example: string, explanation: string, commandType: CommandType): Command {
    return {command, example, explanation, commandType};
}


const rows = [
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER),
    createTableData('Wie geht es dir?', '', '', CommandType.WEATHER)
];

export function CommandTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
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
    );
}
