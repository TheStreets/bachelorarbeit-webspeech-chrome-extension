import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Note} from "../models/notes";
import {FC} from "react";

const columns: GridColDef[] = [
    {
        field: 'time',
        headerName: 'Uhrzeit',
        flex: 0.1,
        valueGetter: (params) => params.row.time + ' Uhr'
    },
    {
        field: 'date',
        headerName: 'Datum',
        flex: 0.2
    },
    {
        field: 'text',
        headerName: 'Notiz',
        flex: 0.7
    },
];

const NotesTable: FC<{ notes: Note[]}> = ({notes}) => {
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={notes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                editMode={"row"}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </div>
    );
}

export default NotesTable;