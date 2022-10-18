import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Note} from "../models/notes";
import {FC} from "react";

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Datum',
        width: 150
    },
    {
        field: 'text',
        headerName: 'Notiz',
        width: 500
    },
];

const NotesTable: FC<{ notes: Note[] }> = ({notes}) => {
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                rows={notes}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                editMode={"row"}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                onSelectionModelChange={(selectionModel, details) => console.log('Model: ', selectionModel, ' details: ', details)}
            />
        </div>
    );
}

export default NotesTable;