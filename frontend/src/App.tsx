import NodeSearch from './components/NodeSearch';
import Workflow from './components/Workflow';
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ThemeProvider } from './components/ThemeProvider';
import { ModeToggle } from './components/ModeToggle';
import NodeSettings from './components/NodeSettings';
import useWorkflowStore from './store/workflow';
import { GithubIcon } from './components/icons/githubIcon';

function App() {
	const { settingNodeID } = useWorkflowStore();
	return (
		<ThemeProvider>
			<ReactFlowProvider>
				<div className='text-black dark:text-white p-5 h-screen w-screen flex flex-row gap-5 saturate-50 bg-gradient-to-r from-[#92fe9d] to-[#00c9ff]'>
					<div className='flex flex-col shadow rounded-lg bg-white/50 min-w-[300px] backdrop-blur-lg dark:bg-black/50'>
						<NodeSearch />
						<div className='p-5 flex justify-center items-center gap-5'>
							<div>
								<span className='mr-2'>Develop by</span>
								<a
									href='https://github.com/Alndaly'
									className='font-bold no-underline'>
									Kinda Hall
								</a>
							</div>
							<GithubIcon />
							<ModeToggle />
						</div>
					</div>
					<div className='shadow overflow-hidden flex-1 h-full rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-lg'>
						<Workflow />
					</div>
					{settingNodeID && (
						<div className='min-w-[300px] shadow overflow-hidden h-full rounded-lg bg-white/50 dark:bg-black/50 backdrop-blur-lg'>
							<NodeSettings />
						</div>
					)}
				</div>
			</ReactFlowProvider>
		</ThemeProvider>
	);
}

export default App;
