import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand'
import { produce } from 'immer'
import {
  Connection,
  OnConnect,
  EdgeChange,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

export interface DataItem {
  type: string;
  label: string;
  data: any;
}

export type NodeOperation = (inputs: DataItem[]) => Promise<DataItem[]>;

export class Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;

  constructor(source: string, target: string, sourceHandle?: string, targetHandle?: string) {
    this.id = uuidv4();
    this.source = source;
    this.target = target;
    if (sourceHandle) {
      this.sourceHandle = sourceHandle;
    }
    if (targetHandle) {
      this.targetHandle = targetHandle;
    }
  }
}

export class Node {
  position?: { x: number, y: number } = { x: 0, y: 0 };
  type?: string;
  id: string;
  data: {
    inputs: DataItem[];  // 输入项的标签列表
    outputs?: DataItem[]; // 输出项的标签列表
  } = { inputs: [] }
  operation?: NodeOperation;

  constructor(type: string) {
    this.id = uuidv4();
    this.type = type
  }
}

export type WorkflowState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

export type Actions = {
  getNodeById: (id: string) => Node | undefined;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setNode: (id: string, node: Node) => void;
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
    const newEdge = new Edge(connection.source!, connection.target!, connection?.sourceHandle, connection?.targetHandle)
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set(produce((state: WorkflowState) => ({ nodes: nodes })));
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  getNodeById: (id: string) => {
    const node = get().nodes.find(node => node.id === id);
    return node;
  },
  setNode: (id: string, node: Node) => {
    set(produce((state: WorkflowState) => ({
      nodes:
        state.nodes.map(n => {
          if (n.id === id) {
            return node;
          }
          return n;
        })
    })))
  }
}));

export default useWorkflowStore;