const styles = theme => ({
    wrapper: {
        marginTop: 50,
        width: '100%',
        color: theme.palette.text.secondary,
        '@media (max-width: 740px)': {
            marginTop: 30,
        },
    },
    questionTypeBlock: {
        paddingBottom: 15,
    },
});
export default styles;
