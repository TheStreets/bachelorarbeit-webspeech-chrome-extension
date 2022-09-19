import React from "react";
import Box from '@mui/material/Box';
import {InputElement} from "../models/InputElement";
import FocusElementComponent from "./FocusElementComponent";

const InputFillComponent: React.FC<{ inputFields: InputElement[], text:string }> =
    ({
         inputFields,
        text
     }) => {
        return (
            <Box>
                {
                    inputFields.map((inputElement: InputElement) => {
                        inputElement.input.value = `${text}`;
                        return (
                            <FocusElementComponent width={inputElement.size.width} height={inputElement.size.height}
                                                   x={inputElement.position.x} y={inputElement.position.y}/>
                        )
                    })
                }
            </Box>
        )
    }

export default InputFillComponent;