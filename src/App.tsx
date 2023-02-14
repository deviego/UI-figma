import * as Toolbar from "@radix-ui/react-toolbar";

import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { zinc } from "tailwindcss/colors";
import DefaultEdges from "./components/edges/DefaltEdges";
import { Square } from "./components/node/Square";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdges,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnection = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  const addSquareNode = () => { 
    setNodes(nodes => [
      ...nodes,
        {
          id: crypto.randomUUID(),
          type: "square",
          position: {
            x: 700,
            y: 350,
          },
          data: {},
        },
      
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        edgeTypes={EDGE_TYPES}
        edges={edges}
        connectionMode={ConnectionMode.Loose}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnection}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: "default",
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 right-1/3 bg-white rounded-2xl  shadow-lg border border-zinc-500 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button className="w-32 h-32 bg-zinc-800 mt-6 rounded transition-transform hover:-translate-y-2" 
        onClick={addSquareNode}
        />
      </Toolbar.Root>
    </div>
  );
}

export default App;
