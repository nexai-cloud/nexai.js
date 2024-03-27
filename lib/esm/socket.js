import io from 'socket.io-client';
let socket;
export const getSocket = () => {
    if (!socket) {
        socket = io('http://localhost:8080');
    }
    return socket;
};
