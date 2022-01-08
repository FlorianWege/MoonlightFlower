import React from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';

export type Attributes = { [P in keyof React.SVGProps<SVGRectElement>]: React.SVGProps<SVGRectElement>[P] };

interface AttributeListProps {
	attributes: Attributes;
	onChange: (newAttributes: Attributes) => void;
}

const AttributeList = (props: AttributeListProps) => {
	return (
		<Box width="400px" border="1px solid black">
			<Typography align="center">AttributeList</Typography>
			<Grid container direction="column" wrap="nowrap">
				{Object.entries(props.attributes).map((obj) => {
					const key = obj[0];
					const value = obj[1];
					return (
						<Grid item container key={key}>
							<Grid item xs={6}>
								<Box bgcolor="lightgray" border="1px solid white">
									<Typography>{key}</Typography>
								</Box>
							</Grid>
							<Grid item xs={6}>
								<Box bgcolor="lightgray" border="1px solid white">
									<TextField
										value={value}
										onChange={(event) =>
											props.onChange({
												...props.attributes,
												[key]: event.target.value,
											})
										}
									/>
								</Box>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default AttributeList;
