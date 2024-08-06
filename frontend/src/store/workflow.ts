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
} from '@xyflow/react';

export interface InputDataItem {
  type: string;
  label: string;
  required: boolean;
  data: any;
  showHandle: boolean;
  showData: boolean;
}

export interface OutputDataItem {
  type: string;
  label: string;
  data: any;
  showHandle: boolean;
  showData: boolean;
}

export type NodeOperation = (inputs: InputDataItem[]) => Promise<OutputDataItem[]>;

export class Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
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
  id: string;
  type?: string;
  status?: 'running' | 'done' | 'todo' | 'error';
  data: {
    inputs?: InputDataItem[];  // 输入项的标签列表
    outputs?: OutputDataItem[]; // 输出项的标签列表
  } = {}
  operation?: NodeOperation;

  constructor(type: string, position: XYPosition) {
    this.id = uuidv4();
    this.type = type;
    this.position = position
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
}));

export default useWorkflowStore;