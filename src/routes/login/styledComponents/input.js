import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';

const CssInput = withStyles(theme => ({
    disabled: {},
    focused: {},
    error: {},
    underline: {
        '&:before': {},
        '&:hover:not($disabled):not($focused):not($error):before': {
            borderBottomColor: theme.palette.primary.main,
        },
    },
}))(Input);

export default CssInput;
