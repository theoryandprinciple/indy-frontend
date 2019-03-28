import { createMuiTheme } from '@material-ui/core/styles';
// https://material-ui.com/customization/default-theme/?expend-path=$.palette.background
const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        text: {
            secondary: 'blue',
        },
    },
});

export default theme;
