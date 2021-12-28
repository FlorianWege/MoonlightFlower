export type GraphNode = {
	id: string;
};

export enum GraphEdgeDirection {
	SOURCE_TO_TARGET,
	TARGET_TO_SOURCE,
	BIDIRECTIONAL,
}

export type GraphEdge<T = any> = {
	source: Node;
	target: Node;
	direction?: GraphEdgeDirection;
	value?: T;
};

export type Graph = {
	nodes: GraphNode[];
	edges: GraphEdge[];
};
