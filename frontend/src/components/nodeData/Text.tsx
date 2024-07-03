import useWorkflowStore from '@/store/workflow';
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { Handle, Position, useNodeId, useReactFlow } from 'reactflow';

type TextDataProps = {
	label: string;
	id: string;
	value: string;
	io: string;
};

export default function TextData(props: TextDataProps) {
	const { label, value, io, id } = props;
	const nodeId = useNodeId();
	const { setNode, getNodeById } = useWorkflowStore();
	const handleTextDataChange = (io: string, id: string, value: any) => {
		const node = getNodeById(nodeId);
		if (!node) return;
		if (io === 'input') {
			setNode(node.id, {
				...node,
				data: {
					...node.data,
					inputs: node.data.inputs.map((input) => {
						if (input.label === id) {
							return { ...input, data: value };
						}
						return input;
					}),
				},
			});
		} else if (io === 'output') {
			setNode(node.id, {
				...node,
				data: {
					...node.data,
					outputs: node.data!.outputs!.map((output) => {
						if (output.label === id) {
							return { ...output, data: value };
						}
						return output;
					}),
				},
			});
		}
	};
	return (
		<div className='w-full'>
			{io === 'input' ? (
				<Handle
					className='absolute top-center left-0 -translate-x-1/2 w-3 h-3 shadow'
					type='target'
					position={Position.Left}
					id={id}
				/>
			) : (
				<Handle
					className='absolute top-center right-0 translate-x-1/2 w-3 h-3 shadow'
					type='source'
					position={Position.Right}
					id={id}
				/>
			)}
			<Field>
				{io === 'input' ? (
					<Label className='max-w-[20em] text-sm/6 font-medium line-clamp-1'>
						{label}
					</Label>
				) : (
					<Label className='max-w-[20em] text-right text-sm/6 font-medium line-clamp-1'>
						{label}
					</Label>
				)}
				<Input
					type='text'
					defaultValue={value}
					onChange={(event) => handleTextDataChange(io, id, event.target.value)}
					className={clsx(
						'block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 dark:bg-white/5',
						'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
					)}
				/>
			</Field>
		</div>
	);
}
