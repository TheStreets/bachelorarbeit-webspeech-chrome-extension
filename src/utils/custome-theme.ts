import {createTheme, ThemeOptions} from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#042c54',
        },
        secondary: {
            main: '#FF4820',
        },
        background: {
            default: '#324e69',
            paper: '#1d3141',
        },
        text: {
            primary: '#ffffff',
            secondary: '#FF4820',
            disabled: 'rgba(255,255,255,0.38)',
        },
        error: {
            main: '#de0f01',
        },
        info: {
            main: '#dec306',
        },
        success: {
            main: '#08c710',
        },
    },
};
export const theme = createTheme(themeOptions);