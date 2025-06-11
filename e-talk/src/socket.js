import { io } from "socket.io-client";

export const socket = io("https://datingapp-production-4dc1.up.railway.app", {
  transports: ["websocket"], // ensures long polling fallback isn't used
});
