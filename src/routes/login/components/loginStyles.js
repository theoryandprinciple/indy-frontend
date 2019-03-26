const styles = (theme) => ({
    formWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 100
    },
    formContainer: {
        marginTop: 30,
        width: '100%',
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 15,
        display: 'inline-block'
    },
    container: {
        width: '50%'
    },
    containerBorder: {
        border: '1px solid black',
        margin: '15px',
        width: '100%'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50%',
        padding:40
    },
    newUserTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50%',
        padding:15
    },

    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
      width: '40%',
      padding: 10,
      margin: 10

    },
    formControl: {

      padding: 25,
      width: '40%',
      'min-width': '300px'

    },
    formControlEmail: {
      padding: 25,
      width: '80%',
      'min-width': '300px'

    }
});
export default styles;
