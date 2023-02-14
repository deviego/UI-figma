import * as Toolbar from "@radix-ui/react-toolbar";
import { useOthers, useUpdateMyPresence } from "./liveblocks.config";

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

type Cursor ={ 
  x:number,
  y:number
}

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
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnection = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);

  const addSquareNode = () => {
    setNodes((nodes) => [
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
    ]);
  };

  return (
    <> 
      <div   
      className=" w-20 h-10 bg-zinc-800 mt-6 ml-6 flex items-center justify-center rounded-2xl ">
        {" "}
        <p className="text-white font-bold">Users: {others.length}</p>
      </div>
      <div className="w-screen h-screen"
        onPointerMove={(e) =>
          updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
        }
        onPointerLeave={() => updateMyPresence({ cursor: null })}
      >
      {others.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
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
          <Toolbar.Button
            className="w-32 h-32 bg-zinc-800 mt-6 rounded transition-transform hover:-translate-y-2"
            onClick={addSquareNode}
          />
        </Toolbar.Root>
      </div>
    </>
  );
}
function Cursor({x, y }:Cursor) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
      }}
      src="https://liveblocks.io/images/cursor.svg"
    />
  );
}

export default App;
