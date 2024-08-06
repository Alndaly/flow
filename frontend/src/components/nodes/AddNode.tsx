import { NodeProps } from '@xyflow/react';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore from '@/store/workflow';
import type { NodeOperation } from '@/store/workflow';
import NodeWrapper from './NodeWrapper';

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
	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
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
						showHandle: false,
						showData: true,
					},
					{
						type: 'number',
						label: '数字2',
						data: null,
						required: true,
						showHandle: false,
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
	}, [getNodeById, props.id, setNode]);

	return (
		<NodeWrapper name='AddNode' selected={selected}>
			<div className='divide-y'>
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
