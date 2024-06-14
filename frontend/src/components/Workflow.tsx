import BaseEdge from './edges/Base';
import { nanoid } from 'nanoid';
import { useShallow } from 'zustand/react/shallow';
import useWorkflowStore, { Actions, WorkflowState } from '@/store/workflow';
import ReactFlow, { NodeTypes, Controls, Background } from 'reactflow';
import '../styles/reactflow.scss';
import SampleNode from './nodes/Sample';
import BottomPanel from './BottomPanel';
import { useReactFlow } from 'reactflow';
import { useRef } from 'react';

const edgeTypes = {
	base: BaseEdge,
};

const nodeTypes: NodeTypes = {
	sample: SampleNode,
};

const selector = (state: WorkflowState & Actions) => ({
	nodes: state.nodes,
	edges: state.edges,
	setNodes: state.setNodes,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
});

export default function Flow() {
	const reactFlow = useReactFlow();
	const graphWrapper = useRef(null);
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
		useWorkflowStore(useShallow(selector));

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		// 获取节点类型ID
		// const id = event.dataTransfer.getData('application/reactflow');
		// 使用 project 将像素坐标转换为内部 ReactFlow 坐标系
		const position = reactFlow.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});
		const newNode = {
			id: nanoid(),
			type: 'sample',
			position,
			data: {},
		};
		nodes.push(newNode);
		reactFlow.setNodes(nodes);
	};

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	return (
		<ReactFlow
			ref={graphWrapper}
			nodes={nodes}
			panOnScroll={true}
			zoomOnScroll={false}
			zoomOnDoubleClick={false}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			edgeTypes={edgeTypes}
			onDrop={(e) => onDrop(e)}
			onDragOver={(e) => onDragOver(e)}
			nodeTypes={nodeTypes}>
			<Background />
			<Controls />
			<BottomPanel />
		</ReactFlow>
	);
}
