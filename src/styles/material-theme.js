import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './colors';
// https://material-ui.com/customization/default-theme/?expend-path=$.palette.background
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        text: {
            secondary: 'blue',
        },
        background: {
            default: Colors.pageBackground,
        },
    },
});

export default theme;
