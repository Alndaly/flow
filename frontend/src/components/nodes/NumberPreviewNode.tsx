import { NodeProps } from 'reactflow';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore, { NodeOperation } from '@/store/workflow';

const numberPreviewOperation: NodeOperation = async () => {
	return [];
};

export default function NumberPreviewNode(props: NodeProps) {
	const { selected } = props;
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
		<div
			className={`${
				selected ? 'outline-1 outline outline-blue-500' : ''
			} rounded-md p-3 shadow hover:shadow-md bg-white dark:bg-black/20 backdrop-blur-lg transition-all`}>
			<div className='pb-2'>
				<div className='font-bold'>Number Preview Node</div>
				{import.meta.env.DEV && (
					<div className='text-sm'>{getNodeById(props.id)?.id}</div>
				)}
			</div>
			<div>
				<div className='divide-y'>
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs.map((input, index) => (
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
