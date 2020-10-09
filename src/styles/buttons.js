import Colors from './colors';

const styles = theme => ({
    fullWidth: {
        width: '100%',
    },
    mobileFullWidth: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    buttonShadow: {
        boxShadow: '0 5px 15px 0 rgba(0,0,0,0.2)',
    },
    textLink: {
        color: Colors.blue,
    },
    footerLink: {
        color: Colors.black,
    },
    linkButton: {
        ...theme.customButtons,
        color: Colors.cobalt,
        fontWeight: 400,
        fontSize: 16,
        [theme.breakpoints.down('lg')]: {
            fontSize: 16,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 16,
        },
        '&:hover, &:focus:hover': {
            backgroundColor: `rgba(${Colors.cobaltBrightRGB},0.18)`,
        },
        '&:active': {
            backgroundColor: `rgba(${Colors.cobaltBrightRGB},0.18)`,
        },
        '&:focus': {
            backgroundColor: Colors.cobalt,
            color: Colors.white,
        },
        '&:disabled': {
            // color: 'white',
        },
        paddingLeft: 20,
        paddingRight: 20,
    },
    primaryNavLinkButton: {
        borderRadius: 4,
        color: Colors.white,
        fontWeight: 700,
        fontSize: 18,
        alignItems: 'center',
        '&:hover, &:focus:hover, &:focus': {
            backgroundColor: `rgba(${Colors.blackRGB},0.33)`,
        },
        '&:active': {
            backgroundColor: `rgba(${Colors.blackRGB},0.5)`,
        },
    },
    linkButtonRippleChildPulsate: {
        backgroundColor: `rgba(${Colors.cobaltBrightRGB},0.18)`,
    },
    blueButton: {
        ...theme.customButtons,
        display: 'block',
        minWidth: 275,
        backgroundColor: Colors.cobaltBright,
        color: 'white',
        '&:hover, &:focus:hover': {
            backgroundColor: Colors.cobalt,
        },
        '&:active': {
            backgroundColor: Colors.cobalt,
        },
        '&:focus': {
            backgroundColor: Colors.cobaltBright,
        },
        '&:disabled': {
            color: Colors.white,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 200,
        },
    },
    blueButtonDisabled: {
        // used to fake disable, for accessability
        color: 'white',
        cursor: 'default',
        backgroundColor: `${Colors.cobaltMd} !important`,
        boxShadow: 'none',
    },
    blueButtonSm: {
        minHeight: 42,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 17,
        minWidth: 0,
        [theme.breakpoints.down('md')]: {
            minHeight: 40,
        },
    },
    blueOutlineButton: {
        ...theme.customButtons,
        minWidth: 275,
        borderRadius: 8,
        fontWeight: 500,
        color: Colors.cobalt,
        border: `1px solid ${Colors.cobalt}`,
        '&:hover, &:focus:hover': {
            backgroundColor: 'rgba(0,80,211,0.08)',
        },
        '&:active': {
            backgroundColor: 'rgba(0,80,211,0.18)',
        },
        '&:focus': {
            backgroundColor: 'rgba(0,80,211,0.18)',
        },
        '&:disabled': {
            color: Colors.white,
        },
        [theme.breakpoints.down('sm')]: {
            minWidth: 200,
        },
    },
    blueOutlineButtonSm: {
        minHeight: 42,
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 0,
        [theme.breakpoints.down('md')]: {
            minHeight: 40,
        },
    },
    blueButtonRippleChildPulsate: {
        backgroundColor: `rgba(${Colors.cobaltDkRGB},1)`, // https://v3.material-ui.com/api/touch-ripple/
    },
    // we have to lift the label above the ripple for accessability
    buttonLabel: {
        position: 'relative',
        zIndex: 1,
    },
    ripplePulsate: {

    },

    /* Selectable Button */
    '@keyframes borderAnimation': {
        from: {
            border: '3px solid rgba(0, 36, 109, 1)',
        },
        to: {
            border: '3px solid rgba(0, 36, 109, .2)',
        },
    },
    selectionButton: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        boxShadow: '0 4px 6px 0 rgba(51,71,91,0.1)',
        borderRadius: 10,
        marginBottom: 15,
        display: 'inline-flex',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            '&:focus': {
                animationName: '$borderAnimation',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease',
                animationDirection: 'alternate',
                animationDuration: '1s',
                marginLeft: -3,
                marginTop: -3,
                marginBottom: 12,
            },
        },
    },
    selectionButtonSelected: {
        border: `3px solid ${Colors.cobalt}`,
        marginLeft: -3,
        marginTop: -3,
        marginBottom: 12,
        '&:focus': {
            animationName: 'none',
        },
    },
    buttonCheckBox: {
        width: 20,
        height: 20,
        border: `2px solid ${Colors.clouds}`,
        borderRadius: 5,
        display: 'inline-flex',
    },
    buttonCheckBoxSelected: {
        width: 20,
        height: 20,
        display: 'inline-flex',
        borderRadius: 5,
        backgroundColor: Colors.cobalt,
        alignItems: 'center',
        justifyContent: 'center',
        '& svg': {
            fill: Colors.white,
            height: 15,
        },
    },
    checkboxText: {
        fontSize: 16,
        color: Colors.black,
        display: 'inline',
        paddingLeft: 15,
    },
    ctaPrimary: {
        marginBottom: 15,
        marginTop: 30,
    },
    ctaSecondary: {
        marginBottom: 15,
    },
});

export default styles;
