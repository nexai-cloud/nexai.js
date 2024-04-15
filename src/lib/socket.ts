import io from 'socket.io-client'

let sessionSocket: ReturnType<typeof io>
let projectSocket: ReturnType<typeof io>

const defaultIoUrl = 'https://ai-chat-server-production.up.railway.app'

export const getSessionSocket = ({
  sessionKey,
  ioUrl = defaultIoUrl
}:{ 
  sessionKey: string;
  ioUrl?: string;
}): ReturnType<typeof io> => {
  if (!sessionKey) {
    throw new TypeError('getSessionSocket(sessionKey) is required')
  }
  if (!sessionSocket) {
    sessionSocket = io(ioUrl + '/session/' + sessionKey)
  }
  return sessionSocket
}

export const getProjectSocket = ({
  projectId,
  ioUrl = defaultIoUrl
}:{ 
  projectId: string;
  ioUrl?: string;
}): ReturnType<typeof io> => {
  if (!projectSocket) {
    projectSocket = io(ioUrl + '/project/' + projectId)
  }
  return projectSocket
}