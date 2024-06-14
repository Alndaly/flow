import { BaseEdge, getBezierPath } from 'reactflow';

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
}: {
	id: string;
	sourceX: number;
	sourceY: number;
	targetX: number;
	targetY: number;
}) {
	const [edgePath] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
		</>
	);
}
