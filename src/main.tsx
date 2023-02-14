import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./global.css"
import { RoomProvider } from './liveblocks.config'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RoomProvider id="deviego-room" initialPresence={{cursor:null}}>
    <App />
    </RoomProvider>
  </React.StrictMode>,
)
