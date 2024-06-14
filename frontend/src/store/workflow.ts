import { create } from 'zustand'
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';

export type WorkflowState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
}

export type Actions = {
    getNode: (id: string) => Node | undefined;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    updateNodeData: (nodeId: string, data: any) => void;
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useWorkflowStore = create<WorkflowState & Actions>((set, get) => ({
    nodes: [],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(connection, get().edges),
        });
    },
    setNodes: (nodes: Node[]) => {
        set({ nodes });
    },
    setEdges: (edges: Edge[]) => {
        set({ edges });
    },
    getNode: (nodeId: string) => {
        const nodes = get().nodes.filter((node) => node.id === nodeId)
        if (nodes.length > 1) throw new Error('存在相同id的节点');
        if (nodes.length === 0) return undefined;
        return nodes[0];
    },
    updateNodeData: (nodeId: string, data: any) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    // it's important to create a new object here, to inform React Flow about the changes
                    return { ...node, data: { ...node.data, ...data } };
                }
                return node;
            }),
        });
    }
}));

export default useWorkflowStore;
