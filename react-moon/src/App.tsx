import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import NavBar, { ROUTES } from './NavBar';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';

const theme = createTheme();

function App() {
	return (
		<>
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Box display="flex" flexDirection="row" flexWrap="nowrap">
							<Box width="10%">
								<NavBar />
							</Box>
							<Box width="90%">
								<Routes>
									{ROUTES.map((route) => {
										const Component = route.component;
										return (
											<Route
												key={route.name}
												path={process.env.PUBLIC_URL + '/' + route.name}
												element={<Component />}
											/>
										);
									})}
								</Routes>
							</Box>
						</Box>
					</BrowserRouter>
				</ThemeProvider>
			</Provider>
		</>
	);
}

export default App;
