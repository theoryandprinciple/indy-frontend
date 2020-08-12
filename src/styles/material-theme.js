import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './colors';
// https://material-ui.com/customization/default-theme/?expend-path=$.palette.background
// https://fonts.adobe.com/fonts/ibm-plex-sans#fonts-section
const theme = createMuiTheme({
    breakpoints: { // using bootstrap defined breakpoints for consistancy
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    typography: {
        useNextVariants: true,
        h1: {
            fontSize: 18,
            fontFamily: 'ibm-plex-sans, sans-serif',
            fontWeight: 400,
            fontStyle: 'normal',
        },
        h2: {
            fontSize: 14,
            fontFamily: 'ibm-plex-sans, sans-serif',
            fontWeight: 700,
            fontStyle: 'normal',
            color: Colors.brown,
            paddingBottom: 20,
        },
        body1: {
            fontSize: 13,
            fontWeight: 400,
        },
        body2: {
            fontSize: 14,
            fontWeight: 800,
        },
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: Colors.blue,
            contrastText: '#fff',
        },
        secondary: {
            main: Colors.orange,
        },
        background: {
            default: Colors.pageBackground,
        },
    },
});

export default theme;
