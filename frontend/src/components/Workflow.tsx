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
		setEdges,
	} = useWorkflowStore();

	const onNodeDrop = (event: React.DragEvent<HTMLDivElement>) => {
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

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
		} else {
			onNodeDrop(e);
		}
	};

	function handleFiles(files: FileList) {
		for (const file of files) {
			const fileReader = new FileReader();
			fileReader.onload = (event) => {
				const { edges, nodes } = JSON.parse(event.target!.result as string);
				setNodes(nodes);
				setEdges(edges);
			};
			fileReader.readAsText(file);
		}
	}

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
			onDragOver={(e) => handleDragOver(e)}
			onDragLeave={(e) => handleDragLeave(e)}
			onDrop={(e) => handleDrop(e)}
			nodeTypes={nodeTypes}>
			<Background />
			<Controls />
			<BottomPanel />
		</ReactFlow>
	);
}
