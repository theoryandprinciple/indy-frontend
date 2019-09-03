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
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
        color: 'black',
    },
    sectionElementIconWrapper: {
        borderRadius: 5,
        backgroundColor: Colors.blue,
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
    sectionElementBR: {
        display: 'block',
        height: 1,
        border: 0,
        borderTop: `${Colors.lightGrey} 1px solid`,
        padding: 0,
        margin: '15px 0',
    },
});

export default styles;
