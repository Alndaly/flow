import { NodeProps } from '@xyflow/react';
import { useCallback, useEffect } from 'react';
import TextData from '../nodeData/Text';
import useWorkflowStore, { Node, NodeOperation } from '@/store/workflow';
import NodeWrapper from './NodeWrapper';
import _ from 'lodash';

const numberPreviewOperation: NodeOperation = async () => {
	return [];
};

export default function NumberPreviewNode(props: NodeProps) {
	const { selected } = props;
	const { getNodeById, setNode } = useWorkflowStore();
	const initNodeWithValue = useCallback(
		(node: Node) => {
			setNode(node?.id, {
				...node,
				data: props.data,
				operation: numberPreviewOperation,
			});
		},
		[props.data, setNode]
	);
	const initNode = useCallback(
		(node: Node) => {
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
							showHandle: true,
						},
					],
				},
			});
		},
		[props.id, setNode]
	);
	useEffect(() => {
		const node = getNodeById(props.id);
		if (!node) return;
		if (_.isEmpty(props.data)) {
			initNode(node);
		} else {
			initNodeWithValue(node);
		}
	}, [getNodeById, initNode, initNodeWithValue, props.id, props.data]);

	return (
		<NodeWrapper name='NumberPreviewNode' selected={selected}>
			<div className='divide-y'>
				{getNodeById(props.id)?.data.inputs && (
					<div className='divide-y'>
						{getNodeById(props.id)?.data.inputs!.map((input, index) => (
							<div className='relative p-3' key={index}>
								<TextData
									io='input'
									disabled={true}
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
			</div>
		</NodeWrapper>
	);
}
