import { Box, TextField } from '@material-ui/core';
import React, { useState, ChangeEvent, useCallback } from 'react';

const rotate = (alphabet: string, input: string, amount: number) => {
	return input
		.split('')
		.map((c) => {
			if (alphabet.indexOf(c) === -1) {
				return '#';
			}
			let index = (alphabet.indexOf(c) + amount) % alphabet.length;
			if (index < 0) {
				index += alphabet.length;
			}
			return alphabet[index];
		})
		.join('');
};

const CaesarComponent = () => {
	const [alphabet, setAlphabet] = useState<string>('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	const [rotation, setRotation] = useState<number>(1);
	const [plainText, setPlainText] = useState<string>('');
	const [cipherText, setCipherText] = useState<string>('');

	const handleAlphabetChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setPlainText('');
		setCipherText('');
		setAlphabet(newValue);
	}, []);
	const handleRotationChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = parseInt(event.target.value);
			setRotation(newValue);
			setCipherText(rotate(alphabet, plainText, newValue));
		},
		[alphabet, plainText]
	);

	const handlePlainTextChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setPlainText(newValue);
			setCipherText(rotate(alphabet, newValue, rotation));
		},
		[alphabet, rotation]
	);
	const handleCipherTextChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setCipherText(newValue);
			setPlainText(rotate(alphabet, newValue, -rotation));
		},
		[alphabet, rotation]
	);

	return (
		<>
			<Box display="flex" flexDirection="row" flexWrap="nowrap">
				<TextField value={alphabet} fullWidth onChange={handleAlphabetChange} />
				<TextField type="number" value={rotation} onChange={handleRotationChange} />
			</Box>
			<TextField value={plainText} fullWidth onChange={handlePlainTextChange} />
			<TextField value={cipherText} fullWidth onChange={handleCipherTextChange} />
		</>
	);
};

export default CaesarComponent;
