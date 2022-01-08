import { Box, Tab, Tabs, TextField } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import React, { useState, ChangeEvent, useCallback, useMemo } from 'react';
import { sam } from './sam';
import { SAMExponentiationComponent } from './SAMExponentiationComponent';
import { KARYExponentiationComponent } from './KARYExponentiationComponent';
import { KARYReducedExponentiationComponent } from './KARYReducedExponentiationComponent';
import { SlidingWindowExponentiationComponent } from './SlidingWindowExponentiationComponent';

const ExponentiationComponent = () => {
	const [tabIndex, setTabIndex] = useState<string>('1');
	const handleTabChange = useCallback((event, newValue) => {
		setTabIndex(newValue);
	}, []);
	return (
		<TabContext value={tabIndex}>
			<Tabs value={tabIndex} onChange={handleTabChange}>
				<Tab label="SAM" value="1" />
				<Tab label="k-ary" value="2" />
				<Tab label="k-ary reduced" value="3" />
				<Tab label="sliding window" value="4" />
			</Tabs>
			<TabPanel value="1">
				<SAMExponentiationComponent />
			</TabPanel>
			<TabPanel value="2">
				<KARYExponentiationComponent />
			</TabPanel>
			<TabPanel value="3">
				<KARYReducedExponentiationComponent />
			</TabPanel>
			<TabPanel value="4">
				<SlidingWindowExponentiationComponent />
			</TabPanel>
		</TabContext>
	);
};

export default ExponentiationComponent;
