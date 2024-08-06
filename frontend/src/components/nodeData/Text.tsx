import useWorkflowStore from '@/store/workflow';
import { Field, Input, Label } from '@headlessui/react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { Handle, Position, useNodeId } from '@xyflow/react';

type TextDataProps = {
	label: string;
	id: string;
	value: string;
	io: string;
	showHandle: boolean;
	showData: boolean;
	required?: boolean;
	disabled?: boolean;
};

export default function TextData(props: TextDataProps) {
	const { label, io, id, value, showHandle, showData, required, disabled } =
		props;
	const { setNode, getNodeById, settingNodeID } = useWorkflowStore();
	let nodeId = useNodeId();
	if (!nodeId) nodeId = settingNodeID;
	const handleTextDataChange = useCallback(
		(io: string, id: string, value: any) => {
			if (!nodeId) return;
			if (io === 'input') {
				setNode(getNodeById(nodeId)!.id, {
					...getNodeById(nodeId)!,
					data: {
						...getNodeById(nodeId)!.data,
						inputs: getNodeById(nodeId)!.data.inputs!.map((input) => {
							if (input.label === id) {
								return { ...input, data: value };
							}
							return input;
						}),
					},
				});
			} else if (io === 'output') {
				setNode(getNodeById(nodeId)!.id, {
					...getNodeById(nodeId)!,
					data: {
						...getNodeById(nodeId)!.data,
						outputs: getNodeById(nodeId)!.data!.outputs!.map((output) => {
							if (output.label === id) {
								return { ...output, data: value };
							}
							return output;
						}),
					},
				});
			}
		},
		[getNodeById, nodeId, setNode]
	);
	return (
		<div className='w-full'>
			{showHandle && io === 'input' && (
				<Handle
					className='absolute top-center left-0 -translate-1/2 w-3 h-3 shadow'
					type='target'
					position={Position.Left}
					id={id}
				/>
			)}
			{showHandle && io === 'output' && (
				<Handle
					className='absolute top-center right-0 translate-1/2 w-3 h-3 shadow'
					type='source'
					position={Position.Right}
					id={id}
				/>
			)}
			<Field>
				{io === 'input' ? (
					<Label className='max-w-[20em] text-sm/6 font-medium'>
						<div className='flex flex-row justify-between pb-1'>
							<div>{label}</div>
							{required && (
								<div className='rounded-full px-2 border text-sm'>必填</div>
							)}
						</div>
					</Label>
				) : (
					<Label className='max-w-[20em] text-right text-sm/6 font-medium line-clamp-1'>
						<div>{label}</div>
					</Label>
				)}
				{showData && (
					<Input
						type='text'
						disabled={disabled}
						value={value ? value : ''}
						onChange={(event) =>
							handleTextDataChange(io, id, event.target.value)
						}
						className={clsx(
							'block w-full rounded-lg border-none bg-black/5 py-1.5 px-3 text-sm/6 dark:bg-white/5',
							'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
						)}
					/>
				)}
			</Field>
		</div>
	);
}
