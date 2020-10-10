import Colors from './colors';

const styles = theme => ({
    containerWrapper: {
        maxWidth: 700,
        marginTop: 60,
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
        },
    },
    sectionWrapper: {
        border: `1px solid ${Colors.grey}`,
        backgroundColor: Colors.white,
        padding: 45,
        marginBottom: 100,
        marginTop: 15,
        borderRadius: 8,
        [theme.breakpoints.down('md')]: {
            padding: 20,
            paddingBottom: 45,
            marginRight: 0,
            marginLeft: 0,
        },
    },
    edgelessContainerWrapper: {
        maxWidth: 700,
        paddingLeft: 0,
        paddingRight: 0,
    },
    edgelessSectionWrapper: {
        backgroundColor: Colors.white,
        paddingTop: 20,
        paddingBottom: 30,
        marginBottom: 100,
        marginTop: 15,
        borderRadius: 8,
        width: '100%',
    },
    edgelessElementWrapper: {
        paddingRight: 60,
        paddingLeft: 60,
        [theme.breakpoints.down('md')]: {
            paddingRight: 15,
            paddingLeft: 15,
        },
    },
});

export default styles;
