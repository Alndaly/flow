import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';

export default function MainEdge({
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
	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} />
			<EdgeLabelRenderer>
				<div
					style={{
						position: 'absolute',
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						pointerEvents: 'all',
					}}
					className='nodrag nopan text-sm'>
					{id}
				</div>
			</EdgeLabelRenderer>
		</>
	);
}
