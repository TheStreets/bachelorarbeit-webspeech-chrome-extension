import React from 'react';
import './App.css';
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import Home from "./home/Home";
import Config from "./config/Config";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {COMMANDS} from "./utils/utils";
import Box from "@mui/material/Box";


function App() {
    const {
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({commands: COMMANDS});

    if (!browserSupportsSpeechRecognition) {
        return (
            <Box>
                <h1>Browser doesn't support speech recognition.</h1>
            </Box>
        );
    }

    SpeechRecognition.startListening({continuous: true, language: 'de_DE'});

    return (
        <div className={"App"}>
            <nav className={"navbar"}>
                <span className={"navbarTitle gradient__text"}>Virtual Assistance</span>
                <div className={"links"}>
                    <NavLink to="/" className={
                        ({isActive}) => isActive ? "activeLink" : "link"
                    }>Home</NavLink>
                    <NavLink to="/config" className={
                        ({isActive}) => isActive ? "activeLink" : "link"
                    }>Configuration</NavLink>
                </div>
            </nav>
            <div className="content">
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/config"} element={<Config/>}/>
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
