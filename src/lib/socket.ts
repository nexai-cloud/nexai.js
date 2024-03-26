import io from 'socket.io-client'

let socket: ReturnType<typeof io>

export const getSocket = () => {
  if (!socket) {
    socket = io('http://localhost:8080')
  }
  return socket
}