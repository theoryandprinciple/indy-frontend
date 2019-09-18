import Colors from '../../../../../styles/colors';

const styles = () => ({
    // Section Wrapper
    sectionWrapperWrapper: {
        height: '100%',
        width: '100%',
        float: 'left',
    },
    sectionTabStyle: {
        padding: 15,
        borderRadius: '5px 5px 0 0',
        backgroundColor: Colors.darkGrey2,
        cursor: 'pointer',
        display: 'inline-block',
    },
    dragHandleStyle: {
        cursor: 'move',
    },
    sectionOpen: {
        // consider adding animation https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible_animate
        display: 'block',
    },
    sectionCollapsed: {
        display: 'none',
    },

    // Section Element
    sectionElementWrapper: {
        border: '1px dashed gray',
        padding: 15,
        marginBottom: 30,
        backgroundColor: 'white',
        cursor: 'move',
        color: 'black',
    },
    elementIconWrapper: {
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
    elementQuestionIcon: {
        backgroundColor: Colors.blue,
    },
    elementOutputIcon: {
        backgroundColor: 'black',
    },
    sectionElementBR: {
        display: 'block',
        height: 1,
        border: 0,
        borderTop: `${Colors.lightGrey} 1px solid`,
        padding: 0,
        margin: '15px 0',
    },
    // element (question/)
    elementHeader: {
        minHeight: 30,
        alignItems: 'center',
        marginBottom: 15,
    },
});

export default styles;
