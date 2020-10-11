import Colors from '../../styles/colors';

const styles = theme => ({
    title: {
        fontSize: 70,
        fontWeight: 700,
        '&span': {
            color: Colors.teal,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 34,
        },
    },
});

export default styles;
