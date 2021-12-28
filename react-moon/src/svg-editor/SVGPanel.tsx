import React from 'react';
import { Box } from '@material-ui/core';

interface Props {
	svg: React.ReactElement | null;
}

const SVGPanel = (props: Props) => {
	return (
		<Box width="400px" height="400px" border="1px solid black">
			{props.svg}
		</Box>
	);
};

export default SVGPanel;
