import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:5555/msg";

export const socket = io(URL, {
  
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

// socket.on("messages", (...args) => {
//   state.fooEvents.push(args);
// });

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});