import io from 'socket.io-client'

let sessionSocket: ReturnType<typeof io>
let projectSocket: ReturnType<typeof io>

export const getSessionSocket = (sessionKey: string): ReturnType<typeof io> => {
  if (!sessionKey) {
    throw new TypeError('getSessionSocket(sessionKey) is required')
  }
  if (!sessionSocket) {
    sessionSocket = io('http://localhost:8080/session/' + sessionKey)
  }
  return sessionSocket
}

export const getProjectSocket = (projectId: string): ReturnType<typeof io> => {
  if (!projectSocket) {
    projectSocket = io('http://localhost:8080/project/' + projectId)
  }
  return projectSocket
}