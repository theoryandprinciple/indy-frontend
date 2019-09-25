import { createMuiTheme } from '@material-ui/core/styles';
import Colors from './colors';
// https://material-ui.com/customization/default-theme/?expend-path=$.palette.background
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        body1: {
            fontSize: 13,
            fontWeight: 400,
        },
        body2: {
            fontSize: 14,
            fontWeight: 800,
        },
    },
    palette: {
        primary: {
            main: Colors.blue,
            contrastText: '#fff',
        },
        secondary: {
            main: Colors.orange,
        },
        background: {
            default: Colors.pageBackground,
        },
    },
});

export default theme;
