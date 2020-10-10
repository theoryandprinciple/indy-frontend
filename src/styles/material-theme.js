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
    props: {
        MuiButton: {
            disableElevation: true,
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 8,
                minHeight: 50,
                paddingLeft: 40,
                paddingRight: 40,
            },
            containedPrimary: {
                '&$disabled': {
                    backgroundColor: `rgba(${Colors.purpleRGB}, .8)`,
                    color: Colors.white,
                },
            },
        },
        MuiFormControlLabel: {
            root: {
                marginTop: 15,
                border: `1px solid ${Colors.grey}`,
                borderRadius: 8,
                minHeight: 50,
                paddingLeft: 5,
                marginLeft: 0,
                marginRight: 0,
                '&[data-checked="true"]': {
                    border: `2px solid ${Colors.purple}`,
                    backgroundColor: Colors.lightTeal,
                },
            },
        },
        MuiCheckbox: {
            root: {},
            icon: {},
            colorPrimary: {
                '&$checked': {},
            },
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
            fontWeight: 700,
            fontSize: 17,
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
