// https://github.com/mui-org/material-ui/tree/master/examples/create-react-app-with-jss/src
import React from 'react';
import { create } from 'jss';
import {
    ThemeProvider,
    createGenerateClassName,
    jssPreset,
    StylesProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
// In this project we are defining the theme externally, and bringing it in through props
// import theme from '../styles/material-theme';

// Create a JSS instance with the default preset of plugins.
// It's optional.
const jss = create(jssPreset());

// The standard class name generator.
// It's optional.
const generateClassName = createGenerateClassName();

function withRoot(Component, theme) {
    function WithRoot(props) {
        // StylesProvider (replaces JssProvider) allows customizing the JSS styling solution.
        return (
            <StylesProvider jss={jss} generateClassName={generateClassName}>
                {/* MuiThemeProvider makes the theme available down the React tree
          thanks to React context. */}
                <ThemeProvider theme={theme}>
                    {
                        /*
                          CssBaseline kickstart an elegant,
                          consistent, and simple baseline to build upon.
                        */
                    }
                    <CssBaseline />
                    <Component {...props} />
                </ThemeProvider>
            </StylesProvider>
        );
    }

    return WithRoot;
}

export default withRoot;
