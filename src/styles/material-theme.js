import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './colors';
// https://material-ui.com/customization/default-theme/?expend-path=$.palette.background
const breakpointObject = createMuiTheme({
    breakpoints: { // using bootstrap defined breakpoints for consistancy
        values: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
});
const theme = createMuiTheme({
    breakpoints: { // using bootstrap defined breakpoints for consistancy
        values: {
            ...breakpointObject.breakpoints.values,
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: '"Kumbh Sans", sans-serif',
        h1: {
            fontSize: 30,
            fontWeight: 700,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 24,
            },
        },
        h2: {
            fontSize: 21,
            fontWeight: 700,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 18,
            },
        },
        body1: {
            fontSize: 17,
            fontWeight: 400,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 15,
            },
        },
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: Colors.purple,
            contrastText: '#fff',
        },
        secondary: {
            main: Colors.teal,
            contrastText: Colors.purple,
        },
        background: {
            default: Colors.lightBlue,
        },
    },
});

export default theme;
