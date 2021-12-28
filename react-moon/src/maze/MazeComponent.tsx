import { Button, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import React, { useMemo, useState } from 'react';

type Tile = {
	type?: 'floor' | 'wall';
};

const grid: Tile[][] = [
	[{ type: 'wall' }, {}, { type: 'wall' }, {}, {}, { type: 'wall' }],
	[{ type: 'wall' }, {}, {}, {}, {}, { type: 'wall' }],
	[{ type: 'wall' }, {}, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }, { type: 'wall' }],
	[{ type: 'wall' }, {}, {}, {}, {}, { type: 'wall' }],
	[{ type: 'wall' }, {}, { type: 'wall' }, { type: 'wall' }, {}, { type: 'wall' }],
	[{ type: 'wall' }, { type: 'wall' }, {}, {}, {}, { type: 'wall' }],
	[{ type: 'wall' }, {}, {}, { type: 'wall' }, {}, { type: 'wall' }],
];

type Location = {
	x: number;
	y: number;
};

type LocationWithValue = Location & { value: number };

const calcPath = (startLocation: Location, endLocation: Location): LocationWithValue[] => {
	const visitedLocations: LocationWithValue[] = [];
	const stack: LocationWithValue[] = [{ ...endLocation, value: 0 }];

	while (true) {
		const curLocation = stack.shift();
		if (!curLocation) {
			break;
		}

		visitedLocations.push(curLocation);

		if (curLocation.x === startLocation.x && curLocation.y === startLocation.y) {
			break;
		}

		const newLocations = [
			{
				...curLocation,
				x: curLocation.x - 1,
			},
			{
				...curLocation,
				x: curLocation.x + 1,
			},
			{
				...curLocation,
				y: curLocation.y - 1,
			},
			{
				...curLocation,
				y: curLocation.y + 1,
			},
		]
			.filter(
				(filterLocation) =>
					filterLocation.y >= 0 &&
					filterLocation.y < grid.length &&
					filterLocation.x >= 0 &&
					filterLocation.x < grid[filterLocation.y].length &&
					grid[filterLocation.y][filterLocation.x].type !== 'wall' &&
					visitedLocations.find(
						(visitedLocation) => visitedLocation.x === filterLocation.x && visitedLocation.y === filterLocation.y
					)?.value === undefined
			)
			.map((location) => ({ ...location, value: location.value + 1 }));

		stack.push(...newLocations);
	}

	return visitedLocations;
};

const MazeComponent = () => {
	const [startLocation, setStartLocation] = useState<Location>({
		x: 3,
		y: 5,
	});

	const [endLocation] = useState<Location>({
		x: 1,
		y: 0,
	});

	const path = useMemo(() => calcPath(startLocation, endLocation), [startLocation, endLocation]);
	const realPath: LocationWithValue[] | null = useMemo(() => {
		const realPath = [];
		const startLocationWithValue = path.find(
			(location) => location.x === startLocation.x && location.y === startLocation.y
		);
		if (!startLocationWithValue) {
			return null;
		}

		let curLocation = startLocationWithValue;
		realPath.push(curLocation);

		while (startLocationWithValue.value > 0) {
			const { x: curX, y: curY, value: curValue } = curLocation;
			const newLocation = path.find(
				(location) => location.value === curValue - 1 && Math.abs(location.x - curX) + Math.abs(location.y - curY) === 1
			);
			if (!newLocation) {
				break;
			}

			curLocation = newLocation;
			realPath.push(curLocation);
		}

		return realPath;
	}, [path, startLocation]);

	return (
		<>
			{grid.map((row, rowIndex) => {
				return (
					<Box key={rowIndex} display="flex" flexDirection="row" flexWrap="nowrap">
						{row.map((tile, colIndex) => {
							return (
								<Box
									key={colIndex}
									width="50px"
									height="50px"
									bgcolor={tile.type === 'wall' ? 'black' : 'grey'}
									border="1px solid black"
									position="relative"
								>
									{colIndex === startLocation.x && rowIndex === startLocation.y && (
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											position="absolute"
										>
											<Typography>S</Typography>
										</Box>
									)}
									{colIndex === endLocation.x && rowIndex === endLocation.y && (
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											position="absolute"
										>
											<Typography>Z</Typography>
										</Box>
									)}
									{path && path.find((location) => location.x === colIndex && location.y === rowIndex) && (
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											position="absolute"
										>
											<Typography>
												{path.find((location) => location.x === colIndex && location.y === rowIndex)?.value}
											</Typography>
										</Box>
									)}
									{realPath && realPath.find((location) => location.x === colIndex && location.y === rowIndex) && (
										<Box
											width="100%"
											height="100%"
											display="flex"
											justifyContent="center"
											alignItems="center"
											bgcolor="green"
											position="absolute"
										>
											<Typography>
												{realPath.find((location) => location.x === colIndex && location.y === rowIndex)?.value}
											</Typography>
										</Box>
									)}

									<Box
										width="100%"
										height="100%"
										display="flex"
										justifyContent="center"
										alignItems="center"
										position="absolute"
									>
										<Button
											style={{ width: '100%', height: '100%' }}
											onClick={() =>
												setStartLocation({
													x: colIndex,
													y: rowIndex,
												})
											}
										/>
									</Box>
								</Box>
							);
						})}
					</Box>
				);
			})}
		</>
	);
};

export default MazeComponent;
