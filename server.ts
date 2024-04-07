import express from 'express';
import { createServer, type Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { config } from '~/lib/config';
import { uuid } from '~/lib/utils';
import debug from 'debug'

const log = debug('nexai:server')

export type IoChatMsg = {
  userUid: string;
  projectId: string;
  sessionKey: string;
  message: string;
  fromName: string;
  toName: string;
  sources?: string[];
}

type ApiResponse = {
  response: [string, [{ url: string }][]]
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

const app: express.Application = express();
const server: HTTPServer = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",  
  },
});

const apiUrl = config.nexaiLocalApiUrl

// app.get('/', (_: Request, res: Response) => {
//   res.sendFile(join(process.cwd(), 'index.html'));
// });

const parseApiResp = (apiResp: ApiResponse) => {
  const sources = apiResp.response[1]
      .map((source: {url:string}[]) => source[1].url)
    const resp = {
      message: apiResp.response[0],
      sources: sources.filter((source: string, i: number) => sources.indexOf(source) === i) 
    }
    return resp
}

const sendChatToAi = async (msg: IoChatMsg) => {
  const resp = await fetch(`${apiUrl}/chat`, {
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
  })
  if (resp.ok) {
    return parseApiResp(await resp.json())
  } else {
    throw new Error('Failed to get AI chat response')
  }
}

const sendSupportChat = async (msg: IoChatMsg) => {
  const resp = await fetch(`${apiUrl}/chat/support`, {
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
  })
  if (resp.ok) {
    return await resp.json()
  } else {
    throw new Error('Failed to get support chat response')
  }
}

const sessions = io.of(/^\/session\/\w+$/);

sessions.on("connection", socket => {
  const session = socket.nsp;

  log('session', session.name)

  socket.emit('chat', {
    uid: 'chat.hello',
    message: "hello from session " + session.name,
    fromName: "server"
  });
  socket.on('chat', async (msg: IoChatMsg) => {
    log('session received chat', msg)
    session.emit('chat', msg)
    io.of('/project/' + msg.projectId).emit('chat', msg)
    try {
      const resp = await sendChatToAi(msg)
      log('ai resp', resp)
      const aiMsg = {
        uid: uuid(),
        userUid: 'nexai',
        sessionKey: msg.sessionKey,
        projectId: msg.projectId,
        fromName: 'nexai',
        toName: msg.fromName,
        message: resp.message,
        sources: resp.sources,
        fromType: 'nexai'
      } as IoChatMsg
      session.emit('chat', aiMsg)
      io.of('/project/' + msg.projectId).emit('chat', aiMsg)
    } catch(e) {
      console.error(e)
    }
  })
});

const projects = io.of(/^\/project\/\w+$/);

projects.on("connection", socket => {
  const project = socket.nsp;

  log('project', project.name)

  socket.emit('chat', {
    uid: 'project.hello',
    message: "hello from project " + project.name,
    fromName: "server"
  });
  socket.on('chat', async (msg: IoChatMsg) => {
    log('project received chat', msg)
    project.emit('chat', msg)
    log('emit', '/session/' + msg.sessionKey, msg)
    io.of('/session/' + msg.sessionKey).emit('chat', msg)
    try {
      const resp = await sendSupportChat(msg)
      log('resp', resp)
    } catch(e) {
      console.error(e)
    }
  })
});

server.listen(PORT, () => {
  log(`Server running at http://localhost:${PORT}`);
});
