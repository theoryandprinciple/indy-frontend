import Colors from '../../../../../styles/colors';

const styles = theme => ({
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
});

export default styles;
