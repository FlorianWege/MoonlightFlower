import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { useState } from 'react';

const encrypt = (alphabet: string, plainText: string, key: string) => {
	return plainText
		.split('')
		.map((c, cIndex) => {
			if (alphabet.indexOf(c) === -1 || cIndex >= key.length || alphabet.indexOf(key[cIndex]) === -1) {
				return '#';
			}
			let index = (alphabet.indexOf(c) + alphabet.indexOf(key[cIndex])) % alphabet.length;
			if (index < 0) {
				index += alphabet.length;
			}
			return alphabet[index];
		})
		.join('');
};

const decrypt = (alphabet: string, cipherText: string, key: string) => {
	return cipherText
		.split('')
		.map((c, cIndex) => {
			if (alphabet.indexOf(c) === -1 || cIndex >= key.length || alphabet.indexOf(key[cIndex]) === -1) {
				return '#';
			}
			let index = (alphabet.indexOf(c) - alphabet.indexOf(key[cIndex])) % alphabet.length;
			if (index < 0) {
				index += alphabet.length;
			}
			return alphabet[index];
		})
		.join('');
};

const VigenereComponent = () => {
	const [alphabet, setAlphabet] = useState<string>('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
	const [plainText, setPlainText] = useState<string>('');
	const [key, setKey] = useState<string>('');
	const [cipherText, setCipherText] = useState<string>('');

	const handleAlphabetChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setPlainText('');
		setKey('');
		setCipherText('');
		setAlphabet(newValue);
	}, []);

	const handlePlainTextChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setPlainText(newValue);
			setCipherText(encrypt(alphabet, newValue, key));
		},
		[alphabet, key]
	);
	const handleKeyChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setKey(newValue);
			setCipherText(encrypt(alphabet, plainText, newValue));
		},
		[alphabet, plainText]
	);
	const handleCipherTextChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setCipherText(newValue);
			setPlainText(decrypt(alphabet, newValue, key));
		},
		[alphabet, key]
	);

	return (
		<>
			<TextField value={alphabet} fullWidth onChange={handleAlphabetChange} />
			<TextField value={plainText} fullWidth onChange={handlePlainTextChange} />
			<TextField value={key} fullWidth onChange={handleKeyChange} />
			<TextField value={cipherText} fullWidth onChange={handleCipherTextChange} />
		</>
	);
};

export default VigenereComponent;
