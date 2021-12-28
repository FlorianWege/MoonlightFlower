import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useCallback } from 'react';
import { useState } from 'react';
import { bin_to_naf } from './NAF';

export const NAFComponent = () => {
	const [inputInteger, setInputInteger] = useState<string>();

	const handleInputIntegerChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setInputInteger(newValue);
	}, []);

	return (
		<>
			<TextField value={inputInteger} fullWidth onChange={handleInputIntegerChange} />
			<TextField value={inputInteger ? bin_to_naf(Number.parseInt(inputInteger, 2)).join('') : ''} fullWidth />
		</>
	);
};

export default NAFComponent;
