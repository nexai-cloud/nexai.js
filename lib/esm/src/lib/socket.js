import io from 'socket.io-client';
let sessionSocket;
let projectSocket;
const defaultIoUrl = 'https://ai-chat-server-production.up.railway.app';
export const getSessionSocket = ({ sessionKey, ioUrl = defaultIoUrl }) => {
    if (!sessionKey) {
        throw new TypeError('getSessionSocket(sessionKey) is required');
    }
    if (!sessionSocket) {
        sessionSocket = io(ioUrl + '/session/' + sessionKey);
    }
    return sessionSocket;
};
export const getProjectSocket = ({ projectId, ioUrl = defaultIoUrl }) => {
    if (!projectSocket) {
        projectSocket = io(ioUrl + '/project/' + projectId);
    }
    return projectSocket;
};
