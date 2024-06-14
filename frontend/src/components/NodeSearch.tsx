import { Input } from '@headlessui/react';
import { useState } from 'react';
import clsx from 'clsx';

interface NodeAvailable {
	name: string;
	description: string;
	id: string;
}

export default function NodeSearch() {
	const [keyword, setKeyword] = useState('');
	const nodesAvailable: NodeAvailable[] = [
		{
			name: 'KSample',
			description: '采样器节点',
			id: '1',
		},
		{
			name: 'Load Image',
			description: '图片加载节点',
			id: '2',
		},
		{
			name: 'Preview Image',
			description: '图片预览节点',
			id: '3',
		},
	];
	const onDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		node: NodeAvailable
	) => {
		// 记录被拖拽的节点类型
		event.dataTransfer.setData('application/reactflow', node.id);
		event.dataTransfer.effectAllowed = 'move';
	};
	return (
		<>
			<h1 className='text-xl font-bold mb-3'>Node Search</h1>
			<Input
				type='text'
				placeholder='Search for a node'
				value={keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
				}}
				className={clsx(
					'block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 dark:bg-white/5',
					'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
					'mb-3'
				)}
			/>
			<div>
				{nodesAvailable
					.filter((node) =>
						node.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
					)
					.map((node, index) => {
						return (
							<div
								draggable
								onDragStart={(e) => onDragStart(e, node)}
								key={index}
								className='flex flex-col mb-3 rounded-lg dark:bg-black bg-white p-3 cursor-pointer'>
								<div className='font-bold'>{node.name}</div>
								<div className='text-sm text-gray-500'>{node.description}</div>
							</div>
						);
					})}
			</div>
		</>
	);
}
