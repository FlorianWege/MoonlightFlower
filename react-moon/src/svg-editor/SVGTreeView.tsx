import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { Attributes } from './AttributeList';
import { Box, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowUpward, ArrowDownward, DeleteForever } from '@mui/icons-material';

export interface Node {
	id: string;
	svgComponent: string;
	attributes: Attributes;
	children: Node[];
}

interface NodeViewProps {
	node: Node;
}

const NodeView = ({ node }: NodeViewProps) => {
	return (
		<TreeItem nodeId={node.id} label={node.svgComponent}>
			{node.children.map((child) => (
				<NodeView key={child.id} node={child} />
			))}
		</TreeItem>
	);
};

interface SVGTreeViewProps {
	rootNodes: Node[];
	onNodeSelect: (nodeId: string | null) => void;
	onMoveNodeUp: () => void;
	onMoveNodeDown: () => void;
	onDeleteNode: () => void;
	onNewElement: (element: string) => void;
}

interface MousePosition {
	x: number;
	y: number;
}

const SVGTreeView = ({
	rootNodes,
	onNodeSelect,
	onMoveNodeUp,
	onMoveNodeDown,
	onDeleteNode,
	onNewElement,
}: SVGTreeViewProps) => {
	const [mousePosition, setMousePosition] = React.useState<MousePosition | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
		event.preventDefault();
		setMousePosition({
			x: event.clientX - 2,
			y: event.clientY - 4,
		});
	};

	const handleClose = () => {
		setMousePosition(null);
	};

	return (
		<Box display="flex" flexDirection="row" flexWrap="nowrap" height="100%">
			<Box height="100%" border="1px solid black">
				<Toolbar
					disableGutters
					style={{
						flexDirection: 'column',
					}}
				>
					<IconButton onClick={onMoveNodeUp}>
						<ArrowUpward />
					</IconButton>
					<IconButton onClick={onMoveNodeDown}>
						<ArrowDownward />
					</IconButton>
					<IconButton onClick={onDeleteNode}>
						<DeleteForever />
					</IconButton>
				</Toolbar>
			</Box>
			<Box width="100%" onContextMenu={handleClick}>
				<TreeView
					onNodeSelect={(event: React.ChangeEvent<{}>, nodeIds: string[]) => {
						onNodeSelect(nodeIds as unknown as string);
					}}
				>
					{rootNodes.map((node) => (
						<NodeView key={node.id} node={node} />
					))}
				</TreeView>
				<Menu
					keepMounted
					open={mousePosition !== null}
					onClose={handleClose}
					anchorReference="anchorPosition"
					anchorPosition={mousePosition ? { left: mousePosition.x, top: mousePosition.y } : undefined}
				>
					<MenuItem
						onClick={() => {
							onNewElement('rect');
							handleClose();
						}}
					>
						rect
					</MenuItem>
					<MenuItem
						onClick={() => {
							onNewElement('circle');
							handleClose();
						}}
					>
						circle
					</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
};

export default SVGTreeView;
