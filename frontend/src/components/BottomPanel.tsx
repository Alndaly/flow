import ClearIcon from '@/assets/clearIcon';
import SaveIcon from '@/assets/saveIcon';
import StartIcon from '@/assets/startIcon';
import AddIcon from '@/assets/addIcon';
import { useCallback } from 'react';
import { useReactFlow, Panel, useStoreApi } from '@xyflow/react';
import useWorkflowStore from '@/store/workflow';
// import { utils } from '@kinda/utils';

export default function BottomPanel() {
	const store = useStoreApi();

	const { setNodes, setEdges } = useReactFlow();

	const { setNode, nodes, edges, getNodeById, setExecutingNode } =
		useWorkflowStore();

	const excuteNode = async (id: string) => {
		if (!getNodeById(id)) {
			throw new Error(`要执行的节点${id}找不到`);
		}
		console.debug(`进入节点${id}`);
		setExecutingNode(getNodeById(id)!);
		// 执行节点
		if (getNodeById(id)!.operation) {
			// await utils.sleep(1000); // 如果你想要更缓慢的查看整个flow的运行过程，就取消注释这一行
			const inputs = getNodeById(id)!.data.inputs;
			for (const input of inputs!) {
				console.debug(`开始获取节点: ${id}的输入项${input.label}`);
				// 找到对应的边
				const edge = edges.find(
					(edge) =>
						edge.target === getNodeById(id)!.id &&
						edge.targetHandle === input.label
				);
				if (!edge && !input.data) {
					throw new Error(
						`节点${id}的输入项${input.label}没有输入并且找不到上级连线节点`
					);
				} else if (!edge) {
					console.debug(
						`节点${id}输入项${input.label}不需要从上级节点获取，具体数值为${input.data}`
					);
					continue;
				}
				// 找到对应的输入节点
				const fromNode = nodes.find((n) => n.id === edge.source);
				if (!fromNode) {
					throw '存在连线，但找不到上级节点';
				}
				console.debug(
					`节点${id}输入项${input.label}需要从上级节点获取，前往执行上级节点${fromNode.id}`
				);
				// 执行输入节点
				const outputs = await excuteNode(fromNode.id);
				// 获取输出项
				const output = outputs.find(
					(output) => output.label === edge.sourceHandle
				);
				console.debug(
					`节点${id}输入项${input.label}获取成功，对应的是上级节点${fromNode.id}的输出项，具体输出项是${edge.sourceHandle}，数值为`,
					output
				);
				if (!output) {
					throw new Error(`连线${edge.id}没有输出`);
				}
				// 设置输入项的值
				setNode(getNodeById(id)!.id, {
					...getNodeById(id)!,
					data: {
						...getNodeById(id)!.data,
						inputs: getNodeById(id)!.data.inputs!.map((input) => {
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
			}
			console.debug(
				`获取当前节点${id}的所有输入成功，打印具体数值：`,
				getNodeById(id)!.data.inputs
			);
			console.debug(`开始执行节点${id}的operate`, getNodeById(id)!.operation);
			const outputs = await getNodeById(id)!.operation!(
				getNodeById(id)!.data.inputs!
			);
			setNode(getNodeById(id)!.id, {
				...getNodeById(id)!,
				data: {
					...getNodeById(id)!.data,
					outputs: outputs,
				},
			});
			console.debug(
				`执行节点${id}完成，打印当前的所有输出：`,
				getNodeById(id)!.data.outputs
			);
			setExecutingNode(null);
			return outputs;
		} else {
			setExecutingNode(null);
			throw new Error(`节点${id}未定义操作函数`);
		}
	};

	const handleStart = () => {
		// 找到尾节点并且执行 判断尾节点的标准是没有edge链接这个尾节点的输出或者没有输出
		const tailNodes = nodes.filter(
			(node) => node.data.outputs?.length === 0 || !node.data.outputs
		);
		tailNodes.forEach((tailNode) => {
			excuteNode(tailNode.id);
		});
	};

	const handleClear = () => {
		setNodes([]);
		setEdges([]);
	};

	const handleAdd = useCallback(() => {}, []);

	const handleSave = useCallback(() => {
		console.log(store.getState());
	}, [store]);

	return (
		<Panel
			position='bottom-center'
			className='p-3 bg-white/20 dark:bg-black/20 flex items-center gap-5 rounded-lg shadow'>
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
		</Panel>
	);
}
