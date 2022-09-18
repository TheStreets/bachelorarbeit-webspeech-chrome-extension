import React from "react";
import Box from '@mui/material/Box';

const FocusElementComponent: React.FC<{ width: number, height: number, x: number, y: number }> =
    ({
         width,
         height,
         x,
         y
     }) => {
        const offset = 15;
        return (
            <Box sx={{
                position: 'fixed',
                border: '2px solid green',
                background: 'transparent',
                width: width + offset,
                height: height + offset,
                top: y - (offset / 2),
                left: x - (offset / 2),
                zIndex: 99999
            }}>
            </Box>
        );
    }

export default FocusElementComponent;