import { Input } from '@headlessui/react';
import { useState } from 'react';
import clsx from 'clsx';

interface NodeAvailable {
	type: string;
	description: string;
	id: string;
}

export default function NodeSearch() {
	const [keyword, setKeyword] = useState('');
	const nodesAvailable: NodeAvailable[] = [
		{
			type: 'addNode',
			description: '加法节点',
			id: '1',
		},
		{
			type: 'numberPreviewNode',
			description: '数字预览节点',
			id: '2',
		},
	];
	const onDragStart = (
		event: React.DragEvent<HTMLDivElement>,
		node: NodeAvailable
	) => {
		// 记录被拖拽的节点类型
		event.dataTransfer.setData('application/reactflow', node.type);
		event.dataTransfer.effectAllowed = 'move';
	};
	return (
		<div className='flex-1 p-5'>
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
			<hr className='my-5' />
			<div className='flex-1'>
				{nodesAvailable
					.filter((node) =>
						node.type.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
					)
					.map((node, index) => {
						return (
							<div
								draggable
								onDragStart={(e) => onDragStart(e, node)}
								key={index}
								className='hover:bg-sky-50 dark:hover:bg-sky-800 outline outline-1 outline-sky-100 dark:outline-sky-800 flex flex-col mb-3 rounded-lg dark:bg-black/20 bg-white p-3 cursor-pointer'>
								<div className='font-bold'>{node.type}</div>
								<div className='text-sm'>{node.description}</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
