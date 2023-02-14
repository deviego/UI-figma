import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_BqYW33-FiHtCbPbXupwdNP-hqp9VLuggF4hmK8zySzWXtYP8f_Ke-U6za-VovdEK",
});

type Presence = {
  cursor: { x: number; y: number } | null;
}; 

export const { RoomProvider, useOthers,useUpdateMyPresence, } = createRoomContext<Presence>(client);