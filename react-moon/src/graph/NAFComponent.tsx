import React from 'react';
import Graphin, { IUserEdge, IUserNode } from '@antv/graphin';
//import _ from 'lodash';

//@typescript-eslint/no-unused-vars
const nodes: IUserNode[] = [
	{
		id: 'node-0',
		style: {
			label: {
				value: 'source',
			},
		},
	},
	{
		id: 'node-1',
		style: {
			label: {
				value: 'target',
			},
		},
	},
];

//@typescript-eslint/no-unused-vars
const edges: IUserEdge[] = [
	{
		source: 'node-0',
		target: 'node-1',
		style: {
			label: {
				value: 'transition',
			},
		},
	},
];

const data = { nodes, edges };

// const layout: Layout = {
// 	type: 'dagre',
// };

type State = {
	name: string;
};

/*interface NAF {
	states: State[];
	alphabet: string[];
	transitionFunction: (sourceState: State, c: string) => State;
	startState: State;
	acceptanceStates: State[];
}

const states: State[] = [
	{
		name: 's0',
	},
	{
		name: 's1',
	},
	{
		name: 's2',
	},
	{
		name: 's3',
	},
];

const errorState: State = {
	name: 'error',
};

const exampleNAF: NAF = {
	states,
	alphabet: ['a', 'b', 'c', ''],
	acceptanceStates: [states[2], states[3]],
	startState: states[0],
	transitionFunction: (sourceState: State, c: string): State => {
		if (sourceState === states[0]) {
			if (c === 'a') {
				return states[1];
			}
		}
		if (sourceState === states[1]) {
			if (c === 'b') {
				return states[2];
			}
			if (c === 'c') {
				return states[3];
			}
			if (c === '') {
				return states[1];
			}
		}

		return errorState;
	},
};*/

enum LayoutType {
	dagre,
	force,
	gForce,
	circular,
	radial,
	mds,
	fruchterman,
	concentric,
	grid,
	comboForce,
}

const NAFComponent = () => {
	/*const nodes: IUserNode[] = exampleNAF.states.concat([errorState]).map((state) => ({
		id: state.name,
		style: {
			label: {
				value: state.name,
			},
			keyshape: {
				fill: state === exampleNAF.startState ? 'red' : undefined,
				stroke: exampleNAF.acceptanceStates.includes(state) ? '5px solid black' : undefined,
			},
		},
	}));

	const edges: IUserEdge[] = exampleNAF.states.flatMap((state) => {
		const stateEdges: IUserEdge[] = exampleNAF.alphabet.map((c) => {
			const targetState: State = exampleNAF.transitionFunction(state, c);

			return {
				source: state.name,
				target: targetState.name,
				type: state === targetState ? 'loop' : undefined,
				style: {
					label: {
						value: c || '\u03f5',
						fill: 'black',
					},
				},
			};
		});

		const stateEdgesGroupedByTarget = _.groupBy(stateEdges, (edge) => edge.target);

		const unifiedStateEdges: IUserEdge[] = Object.entries(stateEdgesGroupedByTarget).map(([target, stateEdgeGroup]) => {
			return {
				source: state.name,
				target,
				type: state.name === target ? 'loop' : undefined,
				style: {
					label: {
						value: 'x',
						fill: 'black',
					},
				},
			};
		});

		return unifiedStateEdges;
	});

	const data: GraphinData = {
		nodes,
		edges,
	};*/

	return (
		<>
			{Object.keys(LayoutType).map((layoutType) => (
				<Graphin key={layoutType} data={data} layout={{ type: layoutType }} fitView />
			))}
		</>
	);
};

export default NAFComponent;
