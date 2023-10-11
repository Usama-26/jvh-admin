import { io } from "socket.io-client";
// const socket = io.connect("https://cryomadness.com");
const socket = io.connect("http://localhost:4000");

export default socket;
