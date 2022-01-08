import { Box, TextField } from '@mui/material';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { kAry } from './k-ary';

export const KARYExponentiationComponent = () => {
	const [base, setBase] = useState<string>();
	const [exponent, setExponent] = useState<string>();
	const [windowSizeS, setWindowSizeS] = useState<string>('1');
	const [modulus, setModulus] = useState<string>();

	const handleBaseChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setBase(newValue);
	}, []);
	const handleExponentChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setExponent(newValue);
	}, []);
	const handleWindowSizeSChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setWindowSizeS(newValue);
	}, []);
	const handleModulusChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setModulus(newValue);
	}, []);

	const windowSize = useMemo(
		() => Math.max(0, Math.min(windowSizeS ? parseInt(windowSizeS, 10) || 1 : 1, 5)),
		[windowSizeS]
	);

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
		k: number;
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
		const power = kAry(
			base ? parseInt(base, 10) : 0,
			exponent ? parseInt(exponent, 10) : 0,
			windowSize,
			modulus ? parseInt(modulus, 10) : Infinity,
			(newA, g) => {
				calcs.push({
					type: 'assign',
					newA,
					g,
				});
			},
			(newA, oldA, n, k) => {
				calcs.push({
					type: 'squaring',
					newA,
					oldA,
					n,
					k,
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
	}, [base, exponent, windowSize, modulus]);

	return (
		<Box display="flex" flexDirection="column">
			Base: <TextField value={base} fullWidth onChange={handleBaseChange} />
			Exponent: <TextField value={exponent} fullWidth onChange={handleExponentChange} />
			Window size k: <TextField value={windowSizeS} fullWidth onChange={handleWindowSizeSChange} />
			Modulus: <TextField value={modulus} fullWidth onChange={handleModulusChange} />
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
										{`${calc.k} * SQ`}
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
				<div>{`#SQ ${calcs
					.filter((calc) => calc.type === 'squaring')
					.map((calc) => calc as squaring)
					.reduce((acc, val) => (acc += val.k), 0)}`}</div>
				<div>{`#MUL ${calcs.filter((calc) => calc.type === 'multiplication').length}`}</div>
			</Box>
		</Box>
	);
};
