import TextData from '../nodeData/Text';
import useWorkflowStore from '@/store/workflow';
import { ChangeEvent } from 'react';
import { useNodeId } from 'reactflow';

type TextDataProps = {
	label: string;
	id: string;
	description: string;
	value: string;
	io: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type Data = {
	label: string;
	type: string;
	id: string;
	io: 'input' | 'output';
	value: any;
	description: string;
};

export type AvaliableData = {
	label: string;
	type: string;
	id: string;
	io: 'input' | 'output';
	description: string;
};

export type CustomNodeProps = {
	avaliableData: AvaliableData[];
	data: Data[];
};

export default function BaseNode(props: CustomNodeProps) {
	const { data, avaliableData } = props;
	const id = useNodeId();

	const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
	const getNode = useWorkflowStore((state) => state.getNode);

	const handleTextDataChange = (value: string, dataId: string) => {
		const node = getNode(id!);
		if (node) {
			const newData = node.data.data.map((item: TextDataProps) => {
				if (item.id === dataId) {
					item.value = value;
				}
				return item;
			});
			updateNodeData(id!, {
				data: newData,
			});
		}
	};

	return (
		<div className='rounded-lg shadow p-3 bg-white dark:bg-black/20 backdrop-blur-lg'>
			<div className='divide-y'>
				<div className='divide-y'>
					{data
						.filter((item) => item.io === 'input')
						.map((data, index) => (
							<div key={index} className='relative p-3'>
								<TextData
									onChange={handleTextDataChange}
									io={data.io}
									id={data.id}
									label={data.label}
									value={data.value}
									description={data.description}
								/>
							</div>
						))}
				</div>
				<div className='divide-y'>
					{data
						.filter((item) => item.io === 'output')
						.map((data, index) => (
							<div key={index} className='relative p-3'>
								<TextData
									onChange={handleTextDataChange}
									io={data.io}
									id={data.id}
									label={data.label}
									value={data.value}
									description={data.description}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
