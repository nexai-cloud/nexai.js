"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const config_1 = require("./src/lib/config");
const utils_1 = require("./src/lib/utils");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('nexai:server');
const PORT = parseInt(process.env.PORT, 10) || 8080;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const apiUrl = process.env.NEXAI_API_URL || config_1.config.nexaiLocalApiUrl;
const sendChatToAi = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${apiUrl}/chat`;
    log('sendChattoAi', { url, msg });
    const resp = yield fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fromName: msg.fromName,
            message: msg.message,
            sessionId: msg.sessionKey,
            projectId: msg.projectId
        })
    });
    if (resp.ok) {
        return yield resp.json();
    }
    else {
        throw new Error('Failed to get AI chat response');
    }
});
const sendSupportChat = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield fetch(`${apiUrl}/chat/support`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userUid: 'support',
            fromName: msg.fromName,
            message: msg.message,
            sessionId: msg.sessionKey,
            projectId: msg.projectId
        })
    });
    if (resp.ok) {
        return yield resp.json();
    }
    else {
        throw new Error('Failed to get support chat response');
    }
});
const sessions = io.of(/^\/session\/\w+$/);
sessions.on("connection", socket => {
    const session = socket.nsp;
    log('session', session.name);
    // socket.emit('chat', {
    //   uid: 'chat.hello',
    //   message: "hello from session " + session.name,
    //   fromName: "server"
    // });
    let sentEmailReq = false;
    socket.on('chat', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        log('session received chat', msg);
        const chatMsg = Object.assign(Object.assign({}, msg), { sessionId: msg.sessionKey, createdAt: new Date(), updatedAt: new Date() });
        if (!msg.email && !sentEmailReq) {
            sentEmailReq = true;
            session.emit('chat', Object.assign(Object.assign({}, chatMsg), { uid: (0, utils_1.randomUUID)(), userUid: 'nexai', message: '💁 Provide an email if you need the team to reach out to you.' }));
        }
        session.emit('chat', chatMsg);
        io.of('/project/' + msg.projectId).emit('chat', chatMsg);
        try {
            const resp = yield sendChatToAi(msg);
            log('ai resp', resp);
            const aiMsg = Object.assign(Object.assign({}, resp.message), { uid: (0, utils_1.randomUUID)(), userUid: 'nexai', sources: resp.sources, sessionKey: msg.sessionKey });
            session.emit('chat', aiMsg);
            io.of('/project/' + msg.projectId).emit('chat', aiMsg);
        }
        catch (e) {
            console.error(e);
        }
    }));
});
const projects = io.of(/^\/project\/\w+$/);
projects.on("connection", socket => {
    const project = socket.nsp;
    log('project', project.name);
    // socket.emit('chat', {
    //   uid: 'project.hello',
    //   message: "hello from project " + project.name,
    //   fromName: "server"
    // });
    socket.on('chat', (msg) => __awaiter(void 0, void 0, void 0, function* () {
        const chatMsg = Object.assign(Object.assign({}, msg), { sessionId: msg.sessionKey, createdAt: new Date(), updatedAt: new Date() });
        log('project received chat', chatMsg);
        project.emit('chat', chatMsg);
        log('emit', '/session/' + msg.sessionKey, chatMsg);
        io.of('/session/' + msg.sessionKey).emit('chat', chatMsg);
        try {
            const resp = yield sendSupportChat(chatMsg);
            log('resp', resp);
        }
        catch (e) {
            console.error(e);
        }
    }));
});
server.listen(PORT, () => {
    console.log(`⚡⚡⚡ Nexai socket.io Chat Server ⚡⚡⚡`);
    console.log(`⛵ http://localhost:${PORT} ⚛`);
});
