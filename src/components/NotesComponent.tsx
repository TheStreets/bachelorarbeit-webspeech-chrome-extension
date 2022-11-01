import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, Stack, TextField} from "@mui/material";
import {Note} from "../models/notes";
import Box from "@mui/material/Box";
import NotesTable from "./notes-table";

const NotesComponent: React.FC<{}> = () => {
    let NOTES: Note[] = []

    const [note, setNote] = useState('');
    const [notes, setNotes] = useState(NOTES);
    const [selections, setSelections] = useState([]);

    /**
     * initialize notes, check if notes existst in storage
     * */
    chrome.storage.sync.get(['notes'], (result) => {
        const initNotes: Note[] = [];
        NOTES = result.notes ? result.notes : initNotes;
        setNotes(NOTES);
    })

    const addNote = (note: Note) => {
        notes.push(note);
        setNote('');
    }

    const removeNotes = (event) => {
        selections.map(i => {
            console.log('I: ', i);
            const index = i - 1;
            console.log('Index: ', index);
            NOTES = notes.splice(index, 1);
            console.log(NOTES);
            return i - 1;
        });
        chrome.storage.sync.set({'notes': NOTES}).catch(e => chrome.tts.speak('Es ist ein Fehler aufgetreten.'));
    }

    const handleInputChange = (event) => {
        console.log('Note: ', event.target.value);
        setNote(event.target.value);
    }

    const saveNote = () => {
        addNote(new Note(note, (notes.length + 1)));
        chrome.storage.sync.set({'notes': notes}).catch(e => chrome.tts.speak('Es ist ein Fehler aufgetreten.'));
    }

    const handleSaveButtonClick = (event) => {
        saveNote();
    }

    useEffect(() => {
        chrome.storage.onChanged.addListener(function (changes, areaName) {
            for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
                console.log(
                    `Storage key "${key}" in namespace "${areaName}" changed.`,
                    `Old value was "${oldValue}", new value is "${newValue}".`
                );
                if (key === 'notes') {
                    setNotes(newValue);
                }
            }
        });
    }, [notes]);

    return (
        <Card variant={"elevation"}>
            <CardContent>
                <Stack direction={"column"} paddingY={"1rem"}>
                    <Stack direction={"row"} width={"100%"} display={"flex"} justifyContent={"center"}
                           alignItems={"center"} paddingBottom={'1.5rem'}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box paddingRight={"2rem"}>
                                <TextField
                                    id="standard-text"
                                    type="text"
                                    value={note}
                                    placeholder={'Notiz'}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    onChange={handleInputChange}
                                    sx={{minWidth: "600px"}}
                                    size={"medium"}
                                    onKeyUp={
                                        (e) => {
                                            if (e.key === 'Enter') {
                                                saveNote();
                                            }
                                        }
                                    }
                                />
                            </Box>
                            <Button variant="contained" disabled={!(note.length)}
                                    onClick={handleSaveButtonClick}>Speichern</Button>
                        </Box>
                    </Stack>
                    <NotesTable notes={notes} onSelection={(selected) => setSelections(selected)}/>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default NotesComponent;