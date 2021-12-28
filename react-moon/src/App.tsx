import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NavBar, { ROUTES } from './NavBar';
import { MuiThemeProvider, createTheme, Box } from '@material-ui/core';
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme();

function App() {
	return (
		<>
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<BrowserRouter>
						<Box display="flex" flexDirection="column" flexWrap="nowrap">
							<NavBar />
							<Routes>
								{ROUTES.map((route) => {
									const Component = route.component;
									return <Route key={route.name} path={'/' + route.name} element={<Component />} />;
								})}
							</Routes>
						</Box>
					</BrowserRouter>
				</MuiThemeProvider>
			</Provider>
		</>
	);
}

export default App;
