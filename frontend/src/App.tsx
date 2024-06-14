import NodeSearch from './components/NodeSearch';
import Workflow from './components/Workflow';
import { ReactFlowProvider } from 'reactflow';

function App() {
	return (
		<ReactFlowProvider>
			<div className='p-5 h-screen w-screen flex flex-row gap-5 saturate-50 bg-[url("https://oss.kinda.info/image/202402112217353.jpg")] bg-cover'>
				<div className='shadow rounded-lg bg-white/80 p-5 min-w-[300px] backdrop-blur-lg dark:bg-black/80'>
					<NodeSearch />
				</div>
				<div className='shadow flex-1 h-full rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-lg'>
					<Workflow />
				</div>
			</div>
		</ReactFlowProvider>
	);
}

export default App;
