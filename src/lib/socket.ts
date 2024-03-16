import { type Socket } from "socket.io";
import io from 'socket.io-client'

let socket: Socket

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:8080')
  }
  return socket
}