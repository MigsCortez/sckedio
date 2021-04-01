import React from 'react';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import App from './App';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'));
