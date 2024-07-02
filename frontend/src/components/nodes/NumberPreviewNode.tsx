import { NodeProps } from 'reactflow';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore, { NodeOperation } from '@/store/workflow';

const numberPreviewOperation: NodeOperation = async (inputs) => {
	return [];
};

export default function NumberPreviewNode(props: NodeProps) {
	const { getNodeById, setNode } = useWorkflowStore();

	const handleTextDataChange = () => {};

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
			<div className='font-bold pb-2'>Number Preview Node</div>
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
							getNodeById(props.id)?.data.outputs.map((output, index) => (
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
