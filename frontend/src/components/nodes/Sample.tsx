import { NodeProps } from 'reactflow';
import BaseNode, { AvaliableData } from './Base';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

export default function SampleNode(props: NodeProps) {
	const [avaliableData, setAvaliableData] = useState<AvaliableData[]>([]);
	const { data } = props.data;
	useEffect(() => {
		setAvaliableData([
			{
				label: 'model',
				type: 'model',
				id: nanoid(),
				io: 'input',
				description: 'The model',
			},
			{
				label: 'positive',
				type: 'clip',
				id: nanoid(),
				io: 'input',
				description: 'The positive prompt',
			},
			{
				label: 'negative',
				type: 'clip',
				id: nanoid(),
				io: 'input',
				description: 'The negative prompt',
			},
			{
				label: 'Latent image',
				type: 'latent',
				id: nanoid(),
				io: 'input',
				description: 'The latent image',
			},
			{
				label: 'Latent',
				type: 'latent',
				id: nanoid(),
				io: 'output',
				description: 'The latent',
			},
			{
				label: 'Seed',
				type: 'Seed',
				id: nanoid(),
				io: 'input',
				description: 'The seed',
			},
			{
				label: 'Steps',
				type: 'Steps',
				id: nanoid(),
				io: 'input',
				description: 'The Steps',
			},
			{
				label: 'CFG',
				type: 'CFG',
				id: nanoid(),
				io: 'input',
				description: 'The CFG',
			},
			{
				label: 'denoise',
				type: 'denoise',
				id: nanoid(),
				io: 'input',
				description: 'The denoise',
			},
			{
				label: 'sample name',
				type: 'sample name',
				id: nanoid(),
				io: 'input',
				description: 'The sample name',
			},
			{
				label: 'scheduler',
				type: 'scheduler',
				id: nanoid(),
				io: 'input',
				description: 'The scheduler',
			},
		]);
	}, []);

	return (
		<>
			<div className='font-bold pb-2'>Sample Node</div>
			{avaliableData && data && (
				<BaseNode data={data} avaliableData={avaliableData} />
			)}
		</>
	);
}
