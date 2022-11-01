import * as React from 'react';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Note} from "../models/notes";
import {FC} from "react";

const columns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Datum',
        flex: 0.3
    },
    {
        field: 'text',
        headerName: 'Notiz',
        flex: 0.7
    },
];

const NotesTable: FC<{ notes: Note[], onSelection}> = ({notes, onSelection}) => {
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