"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = void 0;
const socket_io_client_1 = require("socket.io-client");
let socket;
const getSocket = () => {
    if (!socket) {
        socket = (0, socket_io_client_1.default)('http://localhost:8080');
    }
    return socket;
};
exports.getSocket = getSocket;
