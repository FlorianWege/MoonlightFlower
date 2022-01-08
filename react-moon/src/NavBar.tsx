import { Box, Button } from '@mui/material';
import React from 'react';
import { Routes, useNavigate } from 'react-router-dom';
import CaesarComponent from './caesar/CaesarComponent';
import MazeComponent from './maze/MazeComponent';
import RomanComponent from './roman/RomanComponent';
import SVGEditor from './svg-editor/SVGEditor';
import DimensionalComponent from './threejs/DimensionalComponent';
import TemperatureComponent from './temperature/TemperatureComponent';
import VigenereComponent from './vigenere/VigenereComponent';
import NAFComponent from './graph/NAFComponent';
import { NAFComponent as CryptoNAFComponent } from './math/NAFComponent';

interface NavOptionProps {
	path: string;
}

const NavOption = (props: NavOptionProps) => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => {
				navigate(props.path);
			}}
		>
			{props.path}
		</Button>
	);
};

interface Route {
	name: string;
	component: () => JSX.Element;
}

export const ROUTES: Route[] = [
	{
		name: 'svg-editor',
		component: SVGEditor,
	},
	{
		name: 'roman',
		component: RomanComponent,
	},
	{
		name: 'maze',
		component: MazeComponent,
	},
	{
		name: 'temperature',
		component: TemperatureComponent,
	},
	{
		name: 'dimensional',
		component: DimensionalComponent,
	},
	{
		name: 'caesar',
		component: CaesarComponent,
	},
	{
		name: 'vigenere',
		component: VigenereComponent,
	},
	{
		name: 'Graph',
		component: NAFComponent,
	},
	{
		name: 'Non-adjacent-form',
		component: CryptoNAFComponent,
	},
	{
		name: 'Exponentiation',
		component: ExponentiationComponent,
	},
];

const NavBar = () => {
	return (
		<Box display="flex" flexDirection="column" bgcolor="white">
			<NavOption path="/" />
			{ROUTES.map((route) => (
				<NavOption key={route.name} path={'/' + route.name} />
			))}
		</Box>
	);
};

export default NavBar;
