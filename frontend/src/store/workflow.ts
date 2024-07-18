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
  XYPosition,
} from 'reactflow';

export interface DataItem {
  type: string;
  label: string;
  data: any;
}

export type NodeOperation = (inputs: DataItem[]) => Promise<DataItem[]>;

export class Edge {
  id: string;
  type?: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;

  constructor(type: string, source: string, target: string, sourceHandle: string | null, targetHandle: string | null) {
    this.type = type;
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
  position: XYPosition = { x: 0, y: 0 };
  type?: string;
  id: string;
  data: {
    inputs: DataItem[];  // 输入项的标签列表
    outputs?: DataItem[]; // 输出项的标签列表
  } = { inputs: [] }
  operation?: NodeOperation;

  constructor(type: string, position: XYPosition) {
    this.id = uuidv4();
    this.type = type;
    this.position = position
  }
}

export type WorkflowState = {
  executingNode: Node | null;
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
  setExecutingNode: (node: Node | null) => void;
}

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useWorkflowStore = create<WorkflowState & Actions>((set, get) => ({
  executingNode: null,
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
    const newEdge = new Edge('mainEdge', connection.source!, connection.target!, connection?.sourceHandle, connection?.targetHandle)
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
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
  },
  setExecutingNode(node) {
    set({ executingNode: node });
  },
}));

export default useWorkflowStore;