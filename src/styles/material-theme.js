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
        MuiSelect: {
            root: {
                paddingTop: 10,
                paddingBottom: 10,
            },
        },
        MuiList: {
            root: {
                paddingLeft: 20,
                paddingRight: '20px !important',
            },
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: Colors.lightTeal,
                },
                '&$selected$disabled': {
                    backgroundColor: Colors.white,
                },
            },
        },
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
                '&:hover': {
                    backgroundColor: Colors.lightPurple,
                },
            },
            containedSecondary: {
                '&:hover': {
                    backgroundColor: Colors.lightTeal,
                },
            },
            outlined: {
                paddingLeft: 40,
                paddingRight: 40,
            },
        },
        MuiFormControlLabel: {
            root: {
                marginTop: 15,
                border: `1px solid ${Colors.grey}`,
                borderRadius: 8,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 5,
                marginLeft: 0,
                marginRight: 0,
                paddingRight: 10,
                '&[data-checked="true"]': {
                    border: `2px solid ${Colors.purple}`,
                    backgroundColor: Colors.lightTeal,
                    marginTop: 14,
                    paddingBottom: 9,
                    paddingLeft: 4,
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                color: Colors.black,
                backgroundColor: 'white',
                outline: 0,
                width: '100%',
                padding: '2px 0',
                borderRadius: 3,
                marginTop: 5,
                '& $notchedOutline': {
                    border: `1px solid ${Colors.grey}`,
                },
                '&$focused': {
                    '& $notchedOutline': {
                        border: `1px solid ${Colors.purple}`,
                    },
                    borderRadius: 3,
                    color: Colors.purple,
                },
                '&$error$focused': {
                    '& $notchedOutline': {
                        border: `1px solid ${Colors.error}`,
                    },
                },
            },
            input: {
                borderRadius: 5,
                padding: 10,
            },
        },
    },
    typography: {
        useNextVariants: true,
        fontFamily: '"Kumbh Sans", sans-serif',
        h1: {
            fontSize: 30,
            lineHeight: 1,
            fontWeight: 700,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 24,
                lineHeight: 1,
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
            lineHeight: 1.25,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 15,
            },
        },
        body2: {
            fontSize: 15,
            fontWeight: 400,
            [breakpointObject.breakpoints.down('sm')]: {
                fontSize: 13,
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
        error: {
            main: Colors.error,
        },
    },
});

export default theme;
