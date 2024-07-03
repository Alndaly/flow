import { NodeProps } from 'reactflow';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore from '@/store/workflow';
import type { NodeOperation } from '@/store/workflow';

const addOperation: NodeOperation = async (inputs) => {
	const sum = inputs.reduce((acc, item) => acc + Number(item.data), 0);
	return [{ type: 'number', label: 'output1', data: sum }];
};

export default function SampleNode(props: NodeProps) {
	const { getNodeById, setNode } = useWorkflowStore();
	const handleTextDataChange = (io: string, id: string, value: any) => {
		const node = getNodeById(props.id);
		if (!node) return;
		if (io === 'input') {
			setNode(node.id, {
				...node,
				data: {
					...node.data,
					inputs: node.data.inputs.map((input) => {
						if (input.label === id) {
							return { ...input, data: value };
						}
						return input;
					}),
				},
			});
		} else if (io === 'output') {
			setNode(node.id, {
				...node,
				data: {
					...node.data,
					outputs: node.data!.outputs!.map((output) => {
						if (output.label === id) {
							return { ...output, data: value };
						}
						return output;
					}),
				},
			});
		}
	};

	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
		setNode(node?.id, {
			...node,
			data: {
				inputs: [
					{ type: 'number', label: 'input1', data: null },
					{ type: 'number', label: 'input2', data: null },
				],
				outputs: [{ type: 'number', label: 'output1', data: null }],
			},
			operation: addOperation,
		});
	}, []);

	return (
		<>
			<div className='pb-2'>
				<div className='font-bold'>Add Node</div>
				<div className='text-sm'>{getNodeById(props.id)?.id}</div>
			</div>
			<div className='rounded-lg shadow p-3 bg-white dark:bg-black/20 backdrop-blur-lg'>
				<div className='divide-y'>
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs.map((input, index) => (
							<div className='relative p-3' key={index}>
								<TextData
									onChange={handleTextDataChange}
									io='input'
									id={input.label}
									label={input.label}
									value={input.data}
								/>
							</div>
						))}
					</div>
					<div className='divide-y'>
						{getNodeById(props.id)?.data.outputs &&
							getNodeById(props.id)!.data.outputs!.map((output, index) => (
								<div className='relative p-3' key={index}>
									<TextData
										onChange={handleTextDataChange}
										io='output'
										id={output.label}
										label={output.label}
										value={output.data}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
