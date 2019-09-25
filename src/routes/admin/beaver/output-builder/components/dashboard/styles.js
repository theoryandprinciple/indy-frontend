import Colors from '../../../../../../styles/colors';

const styles = theme => ({
    outputBlockWrapper: {
        backgroundColor: 'white',
        height: 200,
        width: 250,
        marginRight: 40,
        marginBottom: 40,
        flexDirection: 'column',
        borderRadius: 5,
    },
    outputBlockHeader: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors.pageBackground,
        padding: 5,
        paddingRight: 15,
        margin: 15,
        borderRadius: 5,
    },
    outputBlockBody: {
        margin: '5px 15px',
    },
    elementIconWrapper: {
        marginRight: 15,
        borderRadius: 5,
        color: 'white',
        height: 32,
        width: 29,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
            height: 20,
            width: 20,
        },
    },
    elementOutputIcon: {
        backgroundColor: 'black',
    },
    filterWrapper: {
        borderLeft: `1px ${Colors.darkGrey2} solid`,
    },
    filterBtn: {
        paddingLeft: 15,
        width: '100%',
        textAlign: 'left',
        height: 45,
        backgroundColor: Colors.pageBackground,
        '&:hover': {
            backgroundColor: 'white',
            borderLeft: `3px ${Colors.blue} solid`,
            paddingLeft: 12,
        },
    },
    filterBtnActive: {
        backgroundColor: 'white',
        borderLeft: `3px ${Colors.blue} solid`,
        paddingLeft: 12,
    },
});
export default styles;
