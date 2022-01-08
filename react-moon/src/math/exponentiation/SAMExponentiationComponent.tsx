import { Box, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { sam } from './sam';

export const SAMExponentiationComponent = () => {
	const [SAMBase, setSAMBase] = useState<string>();
	const [SAMExponent, setSAMExponent] = useState<string>();
	const [SAMModulus, setSAMModulus] = useState<string>();

	const handleSAMBaseChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSAMBase(newValue);
	}, []);
	const handleSAMExponentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSAMExponent(newValue);
	}, []);
	const handleSAMModulusChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setSAMModulus(newValue);
	}, []);

	type assign = {
		type: 'assign';
		newA: number;
		g: number;
	};

	type squaring = {
		type: 'squaring';
		newA: number;
		oldA: number;
		n: number;
	};

	type multiplication = {
		type: 'multiplication';
		newA: number;
		oldA: number;
		g: number;
		n: number;
	};

	type operation = assign | squaring | multiplication;

	const [power, calcs] = useMemo(() => {
		let calcs: operation[] = [];
		const power = sam(
			SAMBase ? parseInt(SAMBase, 10) : 0,
			SAMExponent ? parseInt(SAMExponent, 10) : 0,
			SAMModulus ? parseInt(SAMModulus, 10) : Infinity,
			(newA, g) => {
				calcs.push({
					type: 'assign',
					newA,
					g,
				});
			},
			(newA, oldA, n) => {
				calcs.push({
					type: 'squaring',
					newA,
					oldA,
					n,
				});
			},
			(newA, oldA, g, n) => {
				calcs.push({
					type: 'multiplication',
					newA,
					oldA,
					g,
					n,
				});
			}
		);
		return [power, calcs];
	}, [SAMBase, SAMExponent, SAMModulus]);

	return (
		<Box display="flex" flexDirection="column">
			Base: <TextField value={SAMBase} fullWidth onChange={handleSAMBaseChange} />
			Exponent: <TextField value={SAMExponent} fullWidth onChange={handleSAMExponentChange} />
			Modulus: <TextField value={SAMModulus} fullWidth onChange={handleSAMModulusChange} />
			<hr />
			<TextField value={power} fullWidth />
			<Box display="grid">
				{(() => {
					let i = 0;
					let e = [1];
					return calcs.map((calc, index, calcs) => {
						if (calcs[index].type === 'squaring') {
							i++;
						}
						if (calc.type === 'assign') {
							return (
								<React.Fragment key={index}>
									<p
										style={{
											gridColumn: 1,
											gridRow: index + 1,
										}}
									>{`${i.toString(10)}`}</p>
									<p
										style={{
											gridColumn: 2,
											gridRow: index + 1,
										}}
									>
										{e.join('')}
									</p>
									<p
										style={{
											gridColumn: 3,
											gridRow: index + 1,
										}}
									>{`${calc.newA} = ${calc.g}`}</p>
									<p
										style={{
											gridColumn: 4,
											gridRow: index + 1,
										}}
									></p>
								</React.Fragment>
							);
						} else if (calc.type === 'squaring') {
							e = [...e, 0];
							return (
								<React.Fragment key={index}>
									<p
										style={{
											gridColumn: 1,
											gridRow: index + 1,
										}}
									>{`${i.toString(10)}a`}</p>
									<p
										style={{
											gridColumn: 2,
											gridRow: index + 1,
										}}
									>
										{e.join('')}
									</p>
									<p
										style={{
											gridColumn: 3,
											gridRow: index + 1,
										}}
									>{`${calc.newA} = ${calc.oldA} * ${calc.oldA} mod ${calc.n}`}</p>
									<p
										style={{
											gridColumn: 4,
											gridRow: index + 1,
										}}
									>
										SQ
									</p>
								</React.Fragment>
							);
						} else {
							e = [...e.slice(0, e.length - 1), 1];
							return (
								<React.Fragment key={index}>
									<p
										style={{
											gridColumn: 1,
											gridRow: index + 1,
										}}
									>{`${i.toString(10)}b`}</p>
									<p
										style={{
											gridColumn: 2,
											gridRow: index + 1,
										}}
									>
										{e.join('')}
									</p>
									<p
										style={{
											gridColumn: 3,
											gridRow: index + 1,
										}}
									>{`${calc.newA} = ${calc.oldA} * ${calc.g} mod ${calc.n}`}</p>
									<p
										style={{
											gridColumn: 4,
											gridRow: index + 1,
										}}
									>
										MUL
									</p>
								</React.Fragment>
							);
						}
					});
				})()}
			</Box>
			<hr />
			<Box display="flex" flexDirection="column">
				<div>{`#SQ ${calcs.filter((calc) => calc.type === 'squaring').length}`}</div>
				<div>{`#MUL ${calcs.filter((calc) => calc.type === 'multiplication').length}`}</div>
			</Box>
		</Box>
	);
};
