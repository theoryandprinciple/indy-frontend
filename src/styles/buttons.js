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
        textDecoration: 'underline',
    },
    footerLink: {
        color: Colors.black,
    },
});

export default styles;
