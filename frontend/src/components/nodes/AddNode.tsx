import { NodeProps } from '@xyflow/react';
import { useCallback, useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore from '@/store/workflow';
import type { Node, NodeOperation } from '@/store/workflow';
import NodeWrapper from './NodeWrapper';
import _ from 'lodash';

const addOperation: NodeOperation = async (inputs) => {
	const sum = inputs.reduce((acc, item) => acc + Number(item.data), 0);
	return [
		{
			type: 'number',
			label: '结果',
			data: sum,
			showHandle: true,
			showData: false,
		},
	];
};

export default function AddNode(props: NodeProps) {
	const { selected } = props;
	const { getNodeById, setNode } = useWorkflowStore();
	const initNodeWithValue = useCallback(
		(node: Node) => {
			setNode(node?.id, {
				...node,
				data: props.data,
				operation: addOperation,
			});
		},
		[props.data, setNode]
	);
	const initNode = useCallback(
		(node: Node) => {
			setNode(node?.id, {
				...node,
				status: 'todo',
				data: {
					inputs: [
						{
							type: 'number',
							label: '数字1',
							data: null,
							required: true,
							showHandle: true,
							showData: true,
						},
						{
							type: 'number',
							label: '数字2',
							data: null,
							required: true,
							showHandle: true,
							showData: true,
						},
					],
					outputs: [
						{
							type: 'number',
							label: '结果',
							data: null,
							showHandle: true,
							showData: false,
						},
					],
				},
				operation: addOperation,
			});
		},
		[setNode]
	);
	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
		if (_.isEmpty(props.data)) {
			initNode(node);
		} else {
			initNodeWithValue(node);
		}
	}, [getNodeById, props.id, props.data, setNode, initNode, initNodeWithValue]);

	return (
		<NodeWrapper name='AddNode' selected={selected}>
			<div className='divide-y'>
				{getNodeById(props.id)?.data.inputs && (
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs!.map((input, index) => (
							<div className='relative p-3' key={index}>
								<TextData
									io='input'
									showHandle={input.showHandle}
									showData={input.showData}
									id={input.label}
									label={input.label}
									value={input.data}
									required={input.required}
								/>
							</div>
						))}
					</div>
				)}
				<div className='divide-y'>
					{getNodeById(props.id)?.data.outputs &&
						getNodeById(props.id)!.data.outputs!.map((output, index) => (
							<div className='relative p-3' key={index}>
								<TextData
									io='output'
									showHandle={output.showHandle}
									showData={output.showData}
									id={output.label}
									label={output.label}
									value={output.data}
								/>
							</div>
						))}
				</div>
			</div>
		</NodeWrapper>
	);
}
