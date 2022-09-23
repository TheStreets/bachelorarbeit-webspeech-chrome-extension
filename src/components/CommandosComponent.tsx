import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export function createTableData(commando: string, example: string, explanation: string) {
    return {commando, example, explanation};
}


const rows = [
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', ''),
    createTableData('Wie geht es dir?', '', '')
];

export function CommandosTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Befehl</TableCell>
                        <TableCell align="left">Beispiel</TableCell>
                        <TableCell align="left">Erklärung</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.commando}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                {row.commando}
                            </TableCell>
                            <TableCell align="center">{row.example}</TableCell>
                            <TableCell align="center">{row.explanation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
