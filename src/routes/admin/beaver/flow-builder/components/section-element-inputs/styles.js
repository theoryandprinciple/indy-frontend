// import Colors from '../../../../../styles/colors';

const styles = () => ({
    inputLabel: {
        // display: 'inline-block',
        // paddingLeft: 15,
        fontSize: 13,
        fontFamily: 'ibm-plex-sans, sans-serif',
        fontWeight: 400,
        fontStyle: 'normal',
    },
    inputUnderline: {
        '&:before': {
            borderBottom: 0,
        },
    },
    inputLabelFocused: {
        fontWeight: 700,
        fontStyle: 'bold',
    },
    answerActions: {
        display: 'none',
    },
    answerRow: {
        '&:hover': {
            cursor: 'pointer', // overrides the drag handle that is default
        },
        '&:hover $answerActions': {
            display: 'inline-flex',
        },
    },
    elementSelectMenu: {
        marginRight: 15,
    },
    addOptionBtn: {
        padding: 9,
    },
    addOptionIcon: {
        marginRight: 15,
    },
    settingsConditionSetDelete: {
        display: 'none',
    },
    settingsConditionSet: {
        '&:hover $settingsConditionSetDelete': {
            display: 'inline-block',
        },
    },
});

export default styles;
