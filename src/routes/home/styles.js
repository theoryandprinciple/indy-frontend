import Colors from '../../styles/colors';

const styles = theme => ({
    title: {
        fontSize: 70,
        fontWeight: 700,
        lineHeight: '1.2em',
        '& span': {
            color: Colors.teal,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 34,
        },
    },
    HIWImg: {
        height: 70,
    },
});

export default styles;
