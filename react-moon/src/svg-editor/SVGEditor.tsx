import React, { useState, useMemo } from 'react';
import AttributeList, { Attributes } from './AttributeList';
import { Typography, Box } from '@material-ui/core';
import SVGPanel from './SVGPanel';
import SVGTreeView, { Node } from './SVGTreeView';

const flatten = (nodes: Node[]): Node[] => {
	return [...nodes, ...nodes.flatMap((node) => flatten(node.children))];
};

const renderNode = (node: Node): React.ReactElement => {
	return React.createElement(
		node.svgComponent,
		{
			key: node.id,
			...node.attributes,
		},
		node.children.map((child) => renderNode(child))
	);
};

let idCounter = 0;

const makeId = () => {
	return `${idCounter++}`;
};

const SVGEditor = () => {
	const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

	const [rootNodes, setRootNodes] = useState<Node[]>([
		{
			id: 'node1',
			svgComponent: 'rect',
			attributes: {
				fill: 'red',
				width: '200px',
				height: '200px',
			},
			children: [
				{
					id: 'node1_1',
					svgComponent: 'rect',
					attributes: {},
					children: [],
				},
			],
		},
		{
			id: 'node2',
			svgComponent: 'circle',
			attributes: {
				fill: 'red',
				r: '50px',
				cx: '25px',
				cy: '25px',
			},
			children: [],
		},
	]);

	const selectedNode = useMemo(() => {
		const node = flatten(rootNodes).find((node) => {
			return node.id === selectedNodeId;
		});
		return node;
	}, [rootNodes, selectedNodeId]);

	const attributes = useMemo(() => {
		return selectedNode?.attributes ?? {};
	}, [selectedNode]);

	const svg: React.ReactElement = useMemo(() => {
		return (
			<svg width="100%" height="100%">
				{rootNodes.map((node) => renderNode(node))}
			</svg>
		);
	}, [rootNodes]);

	const traverse = (nodes: Node[], nodeId: string, transform: (nodes: Node[], nodeId: string) => Node[]): Node[] => {
		return transform(nodes, nodeId).map((node) => ({
			...node,
			children: traverse(node.children, nodeId, transform),
		}));
	};

	const moveNodeDown = (nodes: Node[], nodeId: string): Node[] => {
		const nodeIndex = nodes.findIndex((filterNode) => filterNode.id === nodeId);
		const node = nodes[nodeIndex];
		let newNodes: Node[] = [...nodes];
		if (node) {
			if (nodeIndex === nodes.length - 1) {
				newNodes.pop();
				newNodes.unshift(node);
			} else {
				newNodes = [...nodes.slice(0, nodeIndex), nodes[nodeIndex + 1], node, ...nodes.slice(nodeIndex + 2)];
			}
		}
		return newNodes;
	};

	const onMoveNodeDown = (nodeId: string | null) => {
		if (nodeId) {
			setRootNodes(traverse(rootNodes, nodeId, moveNodeDown));
		}
	};

	const moveNodeUp = (nodes: Node[], nodeId: string): Node[] => {
		const nodeIndex = nodes.findIndex((filterNode) => filterNode.id === nodeId);
		const node = nodes[nodeIndex];
		let newNodes: Node[] = [...nodes];
		if (node) {
			if (nodeIndex === 0) {
				newNodes.shift();
				newNodes.push(node);
			} else {
				newNodes = [...nodes.slice(0, nodeIndex - 1), node, nodes[nodeIndex - 1], ...nodes.slice(nodeIndex + 1)];
			}
		}
		return newNodes;
	};

	const onMoveNodeUp = (nodeId: string | null) => {
		if (nodeId) {
			setRootNodes(traverse(rootNodes, nodeId, moveNodeUp));
		}
	};

	const deleteNode = (nodes: Node[], nodeId: string) => {
		return nodes.filter((filterNode) => filterNode.id !== nodeId);
	};

	const onDeleteNode = (nodeId: string | null) => {
		if (nodeId) {
			setRootNodes(traverse(rootNodes, nodeId, deleteNode));
		}
	};

	const onNewElement = (element: string) => {
		setRootNodes([
			...rootNodes,
			{
				id: makeId(),
				svgComponent: element,
				attributes: {},
				children: [],
			},
		]);
	};

	return (
		<>
			<Typography>SVGEditor</Typography>
			<Box display="flex" flexDirection="row" flexWrap="nowrap">
				<Box display="flex" flexDirection="column" flexWrap="nowrap">
					<Box width="400px" height="400px" border="1px solid black">
						<SVGTreeView
							rootNodes={rootNodes}
							onNodeSelect={(nodeId) => setSelectedNodeId(nodeId)}
							onMoveNodeDown={() => onMoveNodeDown(selectedNodeId)}
							onMoveNodeUp={() => onMoveNodeUp(selectedNodeId)}
							onDeleteNode={() => onDeleteNode(selectedNodeId)}
							onNewElement={(element: string) => onNewElement(element)}
						/>
					</Box>
					<Box width="400px" height="400px" border="1px solid black">
						<AttributeList
							attributes={attributes}
							onChange={(newAttributes: Attributes) => {
								const replace = (node: Node): Node => {
									return {
										...node,
										attributes: node.id === selectedNodeId ? newAttributes : node.attributes,
										children: node.children.map((child) => replace(child)),
									};
								};

								const newRootNodes = rootNodes.map((node) => replace(node));
								setRootNodes(newRootNodes);
							}}
						/>
					</Box>
				</Box>
				<SVGPanel svg={svg} />
			</Box>
		</>
	);
};

export default SVGEditor;
