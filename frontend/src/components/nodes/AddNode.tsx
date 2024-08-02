import { NodeProps } from '@xyflow/react';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore from '@/store/workflow';
import type { NodeOperation } from '@/store/workflow';

const addOperation: NodeOperation = async (inputs) => {
	const sum = inputs.reduce((acc, item) => acc + Number(item.data), 0);
	return [{ type: 'number', label: 'output1', data: sum }];
};

export default function AddNode(props: NodeProps) {
	const { selected } = props;
	const { getNodeById, setNode } = useWorkflowStore();

	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
		setNode(node?.id, {
			...node,
			data: {
				inputs: [
					{ type: 'number', label: 'input1', data: null, required: true },
					{ type: 'number', label: 'input2', data: null, required: true },
				],
				outputs: [{ type: 'number', label: 'output1', data: null }],
			},
			operation: addOperation,
		});
	}, [getNodeById, props.id, setNode]);

	return (
		<div
			className={`${
				selected ? 'outline-1 outline outline-blue-500' : ''
			} rounded-md p-3 shadow hover:shadow-lg bg-white dark:bg-black/20 backdrop-blur-lg transition-all`}>
			<div className='pb-2'>
				<div className='font-bold'>Add Node</div>
				{import.meta.env.DEV && (
					<div className='text-sm'>{getNodeById(props.id)?.id}</div>
				)}
			</div>
			<div>
				<div className='divide-y'>
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs!.map((input, index) => (
							<div className='relative p-3' key={index}>
								<TextData
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
		</div>
	);
}
