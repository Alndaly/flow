import ClearIcon from '@/assets/clearIcon';
import SaveIcon from '@/assets/saveIcon';
import StartIcon from '@/assets/startIcon';
import AddIcon from '@/assets/addIcon';
import { useCallback } from 'react';
import { useReactFlow, Panel, useStoreApi } from 'reactflow';
import useWorkflowStore from '@/store/workflow';

export default function BottomPanel() {
	const store = useStoreApi();

	const { getNodes, setNodes, setEdges } = useReactFlow();

	const { setNode, nodes, edges } = useWorkflowStore();

	const excuteNode = async (id: string) => {
		const node = nodes.find((node) => node.id === id);
		if (!node) {
			throw new Error(`No node found with id ${id}`);
		}
		// 执行尾节点
		if (node.operation) {
			// 找到不完整的输入项列表
			const unsetInputs = node.data.inputs.filter((input) => !input.data);
			unsetInputs.forEach(async (input) => {
				// 找到对应的边
				if (
					edges.filter(
						(edge) =>
							edge.target === node.id && edge.targetHandle === input.label
					).length === 0
				) {
					throw new Error(
						`No edge found for input ${input.label} in node ${node.id}`
					);
				}
				const edge = edges[0];
				// 找到对应的输入节点
				const fromNode = nodes.find((n) => n.id === edge.source);
				if (!fromNode) {
					throw new Error(`No node found for edge ${edge.id}`);
				}
				// 执行输入节点
				const outputs = await excuteNode(fromNode.id);
				// 获取输出项
				const output = outputs.find(
					(output) => output.label === edge.sourceHandle
				);
				if (!output) {
					throw new Error(`No output found for edge ${edge.id}`);
				}
				// 设置输入项的值
				setNode(node.id, {
					...node,
					data: {
						...node.data,
						inputs: node.data.inputs.map((input) => {
							if (input.label === edge.targetHandle) {
								return {
									...input,
									data: output.data,
								};
							}
							return input;
						}),
					},
				});
			});
			const outputs = await node.operation(node.data.inputs);
			setNode(node.id, {
				...node,
				data: {
					...node.data,
					outputs: outputs,
				},
			});
			return outputs;
		} else {
			throw new Error(`No operation defined for this node, nodeID ${node.id}`);
		}
	};

	const handleStart = () => {
		console.log('执行工作流');
		// 找到尾节点并且执行 判断尾节点的标准是没有edge链接这个尾节点的输出或者没有输出
		const tailNodes = nodes.filter(
			(node) => node.data.outputs?.length === 0 || !node.data.outputs
		);
		tailNodes.forEach((tailNode) => {
			// console.log(111, tailNode);
			excuteNode(tailNode.id);
			// console.log(222, tailNode);
		});
	};

	const handleClear = () => {
		setNodes([]);
		setEdges([]);
	};

	const handleAdd = useCallback(() => {
		setNodes([
			{ id: '1', type: 'sample', position: { x: 250, y: 0 }, data: {} },
		]);
	}, [setNodes]);

	const handleSave = useCallback(() => {
		console.log(store.getState());
	}, [store]);

	return (
		<Panel position='bottom-center'>
			<div className='bg-white dark:bg-black/20 rounded-lg px-5 py-3 backdrop-blur-sm bg-transparent border-gray-400 shadow flex items-center gap-5'>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleStart}>
					<StartIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleAdd}>
					<AddIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleClear}>
					<ClearIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleSave}>
					<SaveIcon />
				</div>
			</div>
		</Panel>
	);
}
