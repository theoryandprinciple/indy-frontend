// import Colors from '../../../../../styles/colors';

const styles = () => ({
    inputLabel: {
        // display: 'inline-block',
        // paddingLeft: 15,
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
