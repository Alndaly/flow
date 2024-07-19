import useWorkflowStore, { Node } from '@/store/workflow';
import { ReactFlow, NodeTypes, Controls, Background } from '@xyflow/react';
import AddNode from './nodes/AddNode';
import NumberPreviewNode from './nodes/NumberPreviewNode';
import BottomPanel from './BottomPanel';
import { useReactFlow } from '@xyflow/react';
import { useTheme } from './ThemeProvider';
import { useRef } from 'react';
import MainEdge from './edges/MainEdge';

const edgeTypes = {
	mainEdge: MainEdge,
};

const nodeTypes: NodeTypes = {
	addNode: AddNode,
	numberPreviewNode: NumberPreviewNode,
};

export default function Flow() {
	const { theme } = useTheme();
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

	const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		// 获取节点类型ID
		const type = event.dataTransfer.getData('application/reactflow');
		// 使用 project 将像素坐标转换为内部 ReactFlow 坐标系
		const position = reactFlow.screenToFlowPosition({
			x: event.clientX,
			y: event.clientY,
		});
		const newNode = new Node(type, position);
		setNodes([...nodes, newNode]);
		setNode(newNode.id, {
			...newNode,
		});
	};

	const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	};

	return (
		<ReactFlow
			className='bg-transparent'
			ref={graphWrapper}
			nodes={nodes}
			panOnScroll={true}
			zoomOnScroll={false}
			zoomOnDoubleClick={false}
			edges={edges}
			onNodesChange={onNodesChange}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			colorMode={theme}
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
