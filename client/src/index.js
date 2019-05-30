import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBox, faHandPaper, faCheck, faTimes, faPlus } from '@fortawesome/pro-light-svg-icons'
import "typeface-roboto";

import { store } from "./redux";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary";
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue,
    secondary: pink
  },
})

library.add(faBox, faHandPaper, faCheck, faTimes, faPlus)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <>
          <CssBaseline />
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
