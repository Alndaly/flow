import ClearIcon from '@/assets/clearIcon';
import SaveIcon from '@/assets/saveIcon';
import StartIcon from '@/assets/startIcon';
import AddIcon from '@/assets/addIcon';
import { useCallback } from 'react';
import { useReactFlow, Panel, useStoreApi } from 'reactflow';

export default function BottomPanel() {
	const store = useStoreApi();

	const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();

	const handleStart = () => {
		console.log('执行工作流');
		console.log(getNodes());
		console.log(getEdges());
	};

	const handleClear = () => {
		setNodes([]);
		setEdges([]);
	};

	const handleAdd = useCallback(() => {
		setNodes([
			{ id: '1', type: 'sample', position: { x: 250, y: 0 }, data: {} },
		]);
	}, [setNodes]);

	const handleSave = useCallback(() => {
		console.log(store.getState());
	}, [store]);

	return (
		<Panel position='bottom-center'>
			<div className='bg-white dark:bg-black/20 rounded-lg px-5 py-3 backdrop-blur-sm bg-transparent border-gray-400 shadow flex items-center gap-5'>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleStart}>
					<StartIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleAdd}>
					<AddIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleClear}>
					<ClearIcon />
				</div>
				<div
					className='cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-all duration-300'
					onClick={handleSave}>
					<SaveIcon />
				</div>
			</div>
		</Panel>
	);
}
