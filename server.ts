import express from 'express';
import { createServer, type Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { config } from '~/lib/config';
import { randomUUID } from '~/lib/utils';
import debug from 'debug'
import { NexaiChatMessage } from '~/chat-types';

const log = debug('nexai:server')

export type IoChatMsg = {
  userUid: string;
  projectId: string;
  sessionKey: string;
  message: string;
  fromName: string;
  toName: string;
  sources?: string[];
  aiMuted?: boolean;
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

type AiApiResponse = { message: NexaiChatMessage, sources: string[] }

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
    return  await resp.json() as AiApiResponse
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

  // socket.emit('chat', {
  //   uid: 'chat.hello',
  //   message: "hello from session " + session.name,
  //   fromName: "server"
  // });
  socket.on('chat', async (msg: IoChatMsg) => {
    log('session received chat', msg)
    const chatMsg = {
      ...msg,
      sessionId: msg.sessionKey, // @todo fix
      createdAt: new Date(),
      updatedAt: new Date()
    }
    session.emit('chat', chatMsg)
    io.of('/project/' + msg.projectId).emit('chat', chatMsg)
    try {
      const resp = await sendChatToAi(msg)
      log('ai resp', resp)
      const aiMsg = {
        ...resp.message,
        uid: randomUUID(),
        userUid: 'nexai',
        sources: resp.sources,
        sessionKey: msg.sessionKey,
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

  // socket.emit('chat', {
  //   uid: 'project.hello',
  //   message: "hello from project " + project.name,
  //   fromName: "server"
  // });
  socket.on('chat', async (msg: IoChatMsg) => {
    const chatMsg = {
      ...msg,
      sessionId: msg.sessionKey, // @todo fix
      createdAt: new Date(),
      updatedAt: new Date()
    }
    log('project received chat', chatMsg)
    project.emit('chat', chatMsg)
    log('emit', '/session/' + msg.sessionKey, chatMsg)
    io.of('/session/' + msg.sessionKey).emit('chat', chatMsg)
    try {
      const resp = await sendSupportChat(chatMsg)
      log('resp', resp)
    } catch(e) {
      console.error(e)
    }
  })
});

server.listen(PORT, () => {
  log(`Server running at http://localhost:${PORT}`);
});
