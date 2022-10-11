import React, {useEffect, useState} from "react";
import {Button, Card, CardContent, List, ListItem, ListItemText, Stack, TextField} from "@mui/material";
import {Note} from "../models/notes";
import Box from "@mui/material/Box";

const NotesComponent: React.FC<{}> = () => {
    let NOTES: Note[] = []

    const [note, setNote] = useState('');
    const [notes, setNotes] = useState(NOTES);

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

    const removeNote = (id: number) => {
        const index = notes.findIndex(note => id === note.id);
        if (index !== -1) {
            NOTES = notes.splice(index, 1);
        }
    }

    const handleInputChange = (event) => {
        console.log('Note: ', event.target.value);
        setNote(event.target.value);
    }

    const safeNote = (event) => {
        addNote(new Note(note, (notes.length + 1)));
        chrome.storage.sync.set({'notes': notes}).catch(e => chrome.tts.speak('Es ist ein Fehler aufgetreten.'));
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
                           alignItems={"center"}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Box paddingRight={"2rem"}>
                                <TextField
                                    id="standard-text"
                                    type="text"
                                    value={note}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="standard"
                                    onChange={handleInputChange}
                                    sx={{minWidth: "600px"}}
                                    size={"medium"}
                                />
                            </Box>
                            <Button variant="contained" disabled={!(note.length)} onClick={safeNote}>Speichern</Button>
                        </Box>
                    </Stack>

                    {/*<List>*/}
                    {/*    {*/}
                    {/*        notes.map(note => {*/}
                    {/*            return (*/}
                    {/*                <ListItem>*/}
                    {/*                    <ListItemText*/}
                    {/*                        primary={note.text}*/}
                    {/*                    />*/}
                    {/*                </ListItem>*/}
                    {/*            );*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</List>*/}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default NotesComponent;