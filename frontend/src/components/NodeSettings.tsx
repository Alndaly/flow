import useWorkflowStore, { InputDataItem, OutputDataItem } from '@/store/workflow';
import DeleteIcon from './icons/deleteIcon';
import TextData from './nodeData/Text';
import { Switch } from '@/components/ui/switch';

const NodeSettings = () => {
	const { getNodeById, settingNodeID, setSettingNodeId, setNode } =
		useWorkflowStore();
	const handleShowInputHandleToggle = (value: boolean, input: InputDataItem) => {
		const node = getNodeById(settingNodeID!);
		if (!node) return;
		setNode(settingNodeID!, {
			...node,
			data: {
				...node.data,
				inputs: node.data.inputs!.map((item) => {
					if (item.label === input.label) {
						return {
							...item,
							showHandle: value,
						};
					}
					return item;
				}),
			},
		});
	};
	const handleShowInputDataToggle = (value: boolean, input: InputDataItem) => {
		const node = getNodeById(settingNodeID!);
		if (!node) return;
		setNode(settingNodeID!, {
			...node,
			data: {
				...node.data,
				inputs: node.data.inputs!.map((item) => {
					if (item.label === input.label) {
						return {
							...item,
							showData: value,
						};
					}
					return item;
				}),
			},
		});
	};
	const handleShowOutputHandleToggle = (value: boolean, output: OutputDataItem) => {
		const node = getNodeById(settingNodeID!);
		if (!node) return;
		setNode(settingNodeID!, {
			...node,
			data: {
				...node.data,
				outputs: node.data.outputs!.map((item) => {
					if (item.label === output.label) {
						return {
							...item,
							showHandle: value,
						};
					}
					return item;
				}),
			},
		});
	};
	const handleShowOutputDataToggle = (value: boolean, output: OutputDataItem) => {
		const node = getNodeById(settingNodeID!);
		if (!node) return;
		setNode(settingNodeID!, {
			...node,
			data: {
				...node.data,
				outputs: node.data.outputs!.map((item) => {
					if (item.label === output.label) {
						return {
							...item,
							showData: value,
						};
					}
					return item;
				}),
			},
		});
	};
	return (
		<div className='p-5 overflow-auto'>
			<div className='flex justify-between items-center mb-5'>
				<h2 className='text-xl font-bold'>Node Settings</h2>
				<button className='text-red-500' onClick={() => setSettingNodeId(null)}>
					<DeleteIcon />
				</button>
			</div>
			<div className='rounded outline outline-1 p-3 outline-blue-500'>
				<h3 className='text-lg font-bold pb-2'>输入项：</h3>
				{getNodeById(settingNodeID!)?.data.inputs && (
					<div className='flex flex-col divide-y'>
						{getNodeById(settingNodeID!)?.data.inputs!.map((input, index) => (
							<div className='relative p-2' key={index}>
								<TextData
									io='input'
									showHandle={false}
									showData={true}
									id={input.label}
									label={input.label}
									value={input.data}
									required={input.required}
								/>
								<div className='mt-2 flex flex-row justify-between items-center text-sm'>
									<div>开启链接</div>
									<Switch
										checked={input.showHandle}
										onCheckedChange={(value) =>
											handleShowInputHandleToggle(value, input)
										}
									/>
								</div>
								<div className='mt-2 flex flex-row justify-between items-center text-sm'>
									<div>开启数据显示</div>
									<Switch
										checked={input.showData}
										onCheckedChange={(value) =>
											handleShowInputDataToggle(value, input)
										}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
			<div className='rounded outline outline-1 p-3 outline-blue-500 mt-3'>
				<h3 className='text-lg font-bold pb-2'>输出项：</h3>
				{getNodeById(settingNodeID!)?.data.outputs && (
					<div className='flex flex-col divide-y'>
						{getNodeById(settingNodeID!)?.data.outputs!.map((output, index) => (
							<div className='relative p-2' key={index}>
								<TextData
									io='input'
									showHandle={false}
									showData={true}
									id={output.label}
									label={output.label}
									value={output.data}
								/>
								<div className='mt-2 flex flex-row justify-between items-center text-sm'>
									<div>开启链接</div>
									<Switch
										checked={output.showHandle}
										onCheckedChange={(value) =>
											handleShowOutputHandleToggle(value, output)
										}
									/>
								</div>
								<div className='mt-2 flex flex-row justify-between items-center text-sm'>
									<div>开启数据显示</div>
									<Switch
										checked={output.showData}
										onCheckedChange={(value) =>
											handleShowOutputDataToggle(value, output)
										}
									/>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default NodeSettings;
