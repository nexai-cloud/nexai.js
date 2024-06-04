import io from 'socket.io-client'

let sessionSocket: ReturnType<typeof io>
let projectSocket: ReturnType<typeof io>

export const getSessionSocket = ({
  sessionKey,
  ioUrl
}:{ 
  sessionKey: string;
  ioUrl: string;
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
  ioUrl
}:{ 
  projectId: string;
  ioUrl?: string;
}): ReturnType<typeof io> => {
  if (!projectSocket) {
    projectSocket = io(ioUrl + '/project/' + projectId)
  }
  return projectSocket
}