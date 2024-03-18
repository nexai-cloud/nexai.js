import { randomNameGenerator } from "./random-name"

type NexaiSession = {
  name: string;
  sessionId: string;
  isShowChat: boolean;
}

export const getClientSession = (): NexaiSession => {
  if (typeof window !== "undefined") {
    let session =  fetchSession()
    if (!session) {
      session = createSession()
      setClientSession(session)
    }
    return session
  } else {
    return createSession()
  }
}

export const createSession = (): NexaiSession => {
  return {
    name: randomNameGenerator(),
    sessionId: Math.random().toString(36).substring(2),
    isShowChat: true
  }
}

export const fetchSession = (): NexaiSession|undefined => {
  const session =  window.localStorage.nexaiSession
  if (session) {
    return JSON.parse(session)
  }
}

export const setClientSession = (session: NexaiSession) => {
  const json = JSON.stringify(session)
  window.localStorage.setItem('nexaiSession', json)
}