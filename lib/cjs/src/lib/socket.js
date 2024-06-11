"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectSocket = exports.getSessionSocket = void 0;
const socket_io_client_1 = __importDefault(require("socket.io-client"));
let sessionSocket;
let projectSocket;
const getSessionSocket = ({ sessionKey, ioUrl }) => {
    if (!sessionKey) {
        throw new TypeError('getSessionSocket(sessionKey) is required');
    }
    if (!sessionSocket) {
        sessionSocket = (0, socket_io_client_1.default)(ioUrl + '/session/' + sessionKey);
    }
    return sessionSocket;
};
exports.getSessionSocket = getSessionSocket;
const getProjectSocket = ({ projectId, ioUrl }) => {
    if (!projectSocket) {
        projectSocket = (0, socket_io_client_1.default)(ioUrl + '/project/' + projectId);
    }
    return projectSocket;
};
exports.getProjectSocket = getProjectSocket;
