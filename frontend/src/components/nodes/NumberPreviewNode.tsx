import { NodeProps } from 'reactflow';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore, { NodeOperation } from '@/store/workflow';

const numberPreviewOperation: NodeOperation = async () => {
	return [];
};

export default function NumberPreviewNode(props: NodeProps) {
	const { getNodeById, setNode } = useWorkflowStore();

	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
		setNode(props.id, {
			...node,
			operation: numberPreviewOperation,
			data: {
				...node.data,
				inputs: [{ type: 'number', label: 'input1', data: null }],
			},
		});
	}, []);

	return (
		<>
			<div className='pb-2'>
				<div className='font-bold'>Number Preview Node</div>
				<div className='text-sm'>{getNodeById(props.id)?.id}</div>
			</div>
			<div className='rounded-lg shadow p-3 bg-white dark:bg-black/20 backdrop-blur-lg'>
				<div className='divide-y'>
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs.map((input, index) => (
							<div className='relative p-3' key={index}>
								<div>{input.data}</div>
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
									<div>{output.data}</div>
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
		</>
	);
}
