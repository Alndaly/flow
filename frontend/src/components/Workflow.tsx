import BaseEdge from './edges/Base';
import { useShallow } from 'zustand/react/shallow';
import useWorkflowStore, {
	Actions,
	Node,
	WorkflowState,
} from '@/store/workflow';
import ReactFlow, { NodeTypes, Controls, Background } from 'reactflow';
import '../styles/reactflow.scss';
import AddNode from './nodes/AddNode';
import NumberPreviewNode from './nodes/NumberPreviewNode';
import BottomPanel from './BottomPanel';
import { useReactFlow } from 'reactflow';
import { useEffect, useRef } from 'react';

const edgeTypes = {
	base: BaseEdge,
};

const nodeTypes: NodeTypes = {
	addNode: AddNode,
	numberPreviewNode: NumberPreviewNode,
};

export default function Flow() {
	const reactFlow = useReactFlow();
	const graphWrapper = useRef(null);
	const {
		nodes,
		edges,
		onConnect,
		onNodesChange,
		onEdgesChange,
		setNode,
		setNodes,
	} = useWorkflowStore();

	// useEffect(() => {
	// 	console.log('nodes update', nodes);
	// }, [nodes]);

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		// 获取节点类型ID
		const type = event.dataTransfer.getData('application/reactflow');
		// 使用 project 将像素坐标转换为内部 ReactFlow 坐标系
		const position = reactFlow.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});
		const newNode = new Node(type);
		setNodes([...nodes, newNode]);
		setNode(newNode.id, {
			...newNode,
			position: {
				x: position.x,
				y: position.y,
			},
		});
	};

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	return (
		<>
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
		</>
	);
}
