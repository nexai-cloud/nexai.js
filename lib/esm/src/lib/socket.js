import io from 'socket.io-client';
let sessionSocket;
let projectSocket;
export const getSessionSocket = ({ sessionKey, ioUrl }) => {
    if (!sessionKey) {
        throw new TypeError('getSessionSocket(sessionKey) is required');
    }
    if (!sessionSocket) {
        sessionSocket = io(ioUrl + '/session/' + sessionKey);
    }
    return sessionSocket;
};
export const getProjectSocket = ({ projectId, ioUrl }) => {
    if (!projectSocket) {
        projectSocket = io(ioUrl + '/project/' + projectId);
    }
    return projectSocket;
};
