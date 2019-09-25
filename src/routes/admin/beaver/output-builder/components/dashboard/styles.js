import Colors from '../../../../../../styles/colors';

const styles = theme => ({
    wrapper: {
        paddingTop: 60,
    },
    dashboardOutputBlockWrapper: {
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
    },
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
            borderLeft: `3px ${Colors.darkGrey2} solid`,
            paddingLeft: 12,
        },
    },
    filterBtnActive: {
        backgroundColor: 'white',
        borderLeft: `3px ${Colors.blue} solid`,
        paddingLeft: 12,
        '&:hover': {
            borderLeft: `3px ${Colors.blue} solid`,
        },
    },
    // Dialog
    dialogWrapper: {},
    dialogContentWrapper: {
        padding: 30,
        width: 600,
    },
    dialogOutputBlockWrapper: {
        border: `1px ${Colors.lightGrey} solid`,
        width: 213,
        height: 180,
        padding: 15,
    },
    dialogCloseButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialogTitle: {
        paddingTop: 50,
    },
    dialogElementIconWrapper: {
        margin: '0 auto',
        marginBottom: 15,
    },
    addOutputBtn: {
        height: 60,
        width: 60,
        borderRadius: 60,
        backgroundColor: Colors.blue,
        position: 'fixed',
        top: 50,
    },
});
export default styles;
