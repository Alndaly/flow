import { NodeProps } from '@xyflow/react';
import { useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore, { NodeOperation } from '@/store/workflow';
import NodeWrapper from './NodeWrapper';

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
			status: 'todo',
			operation: numberPreviewOperation,
			data: {
				...node.data,
				inputs: [
					{
						type: 'number',
						label: '结果',
						data: null,
						required: true,
						showData: true,
						showHandle: false,
					},
				],
			},
		});
	}, []);

	return (
		<NodeWrapper name='NumberPreviewNode' selected={selected}>
			<div className='divide-y'>
				{getNodeById(props.id)?.data.inputs && (
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs!.map((input, index) => (
							<div className='relative p-3' key={index}>
								<TextData
									io='input'
									showHandle={true}
									showData={true}
									id={input.label}
									label={input.label}
									value={input.data}
									required={input.required}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</NodeWrapper>
	);
}
