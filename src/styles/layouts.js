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
