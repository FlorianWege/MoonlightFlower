import React from 'react';
import './App.css';
import { Route } from 'react-router';
import SVGEditor from './svg-editor/SVGEditor';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import { MuiThemeProvider, createMuiTheme, Box } from '@material-ui/core'
import { Provider } from 'react-redux';
import store from './store';
import RomanComponent from './roman/RomanComponent';
import MazeComponent from './maze/MazeComponent';

const theme = createMuiTheme();

function App() {
  return (
    <>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Box display='flex' flexDirection='column' flexWrap='nowrap'>
          <NavBar />
          <Route path="/svg-editor">
            <SVGEditor />
          </Route>
          <Route path="/roman">
            <RomanComponent />
          </Route>
          <Route path="/maze">
            <MazeComponent />
          </Route>
          </Box>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
    </>
  );
}

export default App;
