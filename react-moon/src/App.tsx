import React from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NavBar, { ROUTES } from './NavBar';
import { MuiThemeProvider, createMuiTheme, Box } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store';

const theme = createMuiTheme();

function App() {
	return (
		<>
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<BrowserRouter>
						<Box display="flex" flexDirection="column" flexWrap="nowrap">
							<NavBar />
							{ROUTES.map((route) => {
								const Component = route.component;
								return (
									<Route key={route.name} path={'/' + route.name}>
										<Component />
									</Route>
								);
							})}
						</Box>
					</BrowserRouter>
				</MuiThemeProvider>
			</Provider>
		</>
	);
}

export default App;
