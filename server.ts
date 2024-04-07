import express, { type Request, type Response } from 'express';
import { createServer, type Server as HTTPServer } from 'http';
import { join } from 'path';
import { Server as SocketIOServer } from 'socket.io';
import { config } from '~/lib/config';

type ChatMsg = {
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

app.get('/', (_: Request, res: Response) => {
  res.sendFile(join(process.cwd(), 'index.html'));
});

const parseApiResp = (apiResp: ApiResponse) => {
  const sources = apiResp.response[1]
      .map((source: {url:string}[]) => source[1].url)
    const resp = {
      message: apiResp.response[0],
      sources: sources.filter((source: string, i: number) => sources.indexOf(source) === i) 
    }
    return resp
}

const sendChatToAi = async (msg: ChatMsg) => {
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

const sendSupportChat = async (msg: ChatMsg) => {
  const resp = await fetch(`${apiUrl}/chat/support`, {
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
    return await resp.json()
  } else {
    throw new Error('Failed to get support chat response')
  }
}

const sessions = io.of(/^\/session\/\w+$/);

sessions.on("connection", socket => {
  const session = socket.nsp;

  console.log('session', session.name)

  socket.emit('chat', {
    message: "hello from session " + session.name,
    fromName: "server"
  });
  socket.on('chat', async (msg: ChatMsg) => {
    console.log('session received chat', msg)
    session.emit('chat', msg)
    io.of('/project/' + msg.projectId).emit('chat', msg)
    const resp = await sendChatToAi(msg)
    console.log('ai resp', resp)
    const aiMsg = {
      sessionKey: session.name,
      projectId: msg.projectId,
      fromName: 'nexai',
      toName: msg.fromName,
      message: resp.message,
      sources: resp.sources
    } as ChatMsg
    session.emit('chat', aiMsg)
    io.of('/project/' + msg.projectId).emit('chat', aiMsg)
  })
});

const projects = io.of(/^\/project\/\w+$/);

projects.on("connection", socket => {
  const project = socket.nsp;

  console.log('project', project.name)

  socket.emit('chat', {
    message: "hello from project " + project.name,
    fromName: "server"
  });
  socket.on('chat', async (msg: ChatMsg) => {
    console.log('project received chat', msg)
    project.emit('chat', msg)
    console.log('emit', '/session/' + msg.sessionKey, msg)
    io.of('/session/' + msg.sessionKey).emit('chat', msg)
    const resp = await sendSupportChat(msg)
    console.log('resp', resp)
  })
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
