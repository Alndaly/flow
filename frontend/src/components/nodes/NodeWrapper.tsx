import useWorkflowStore from '@/store/workflow';
import { NodeToolbar, Position, useNodeId } from '@xyflow/react';
import LoadingIcon from '../icons/loading';
const NodeWrapper = ({
	children,
	selected,
	name,
}: {
	children: React.ReactNode;
	selected?: boolean;
	name: string;
}) => {
	const id = useNodeId()!;
	const { getNodeById } = useWorkflowStore();
	console.log(id, getNodeById(id)?.status)
	return (
		<div
			className={`
				p-[1px]
				${selected ? 'outline outline-1 outline-blue-500' : ''}
				${getNodeById(id)?.status === 'error' ? 'outline outline-1 outline-red-800' : ''}
				${getNodeById(id)?.status === 'running' ? 'outline outline-1 rotating-outline' : ''}
				overflow-hidden rounded-md shadow hover:shadow-lg backdrop-blur-lg transition-all`}>
			<div className='bg-white dark:bg-gray-500 p-3 rounded-md'>
				<NodeToolbar isVisible={selected} position={Position.Top}>
					<div className='rounded-full border border-1 px-2'>
						<button>编辑</button>
					</div>
				</NodeToolbar>
				<div className='pb-2'>
					<div className='font-bold flex flex-row justify-between items-center'>
						{name}
						<div className='rounded-full px-2 border text-sm flex flex-row gap-2 items-center'>
							{getNodeById(id)?.status}
							{getNodeById(id)?.status === 'running' && <LoadingIcon />}
						</div>
					</div>
					{import.meta.env.DEV && (
						<div className='text-sm'>{getNodeById(id)?.id}</div>
					)}
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default NodeWrapper;
