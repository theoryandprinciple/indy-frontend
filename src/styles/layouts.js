import Colors from './colors';

const styles = theme => ({
    containerWrapper: {
        maxWidth: 700,
        marginTop: 60,
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
            paddingRight: 0,
            paddingLeft: 0,
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
            marginTop: 0,
            padding: 20,
            paddingBottom: 45,
            marginRight: 0,
            marginLeft: 0,
            borderRadius: 0,
        },
    },
    sectionWrapperPurple: {
        backgroundColor: Colors.purple,
        color: Colors.white,
    },
    sectionWrapperFullWidth: {
        border: 'none',
        borderRadius: 0,
        margin: 0,
    },
    // EXPANDABLE BLOCK
    expandableContentRow: {
        overflow: 'hidden',
        transition: 'all 0.2s ease-out',
        outline: 0,
    },
    expandableOpened: {
        maxHeight: '100%',
        paddingBottom: 0,
    },
    expandableClosed: {
        maxHeight: 0,
        paddingBottom: 0,
    },
});

export default styles;
