import io from 'socket.io-client'

let sessionSocket: ReturnType<typeof io>
let projectSocket: ReturnType<typeof io>

export const getSessionSocket = ({
  sessionKey,
  ioUrl = 'http://localhost:8080'
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
  ioUrl = 'http://localhost:8080'
}:{ 
  projectId: string;
  ioUrl?: string;
}): ReturnType<typeof io> => {
  if (!projectSocket) {
    projectSocket = io(ioUrl + '/project/' + projectId)
  }
  return projectSocket
}