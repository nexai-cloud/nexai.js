import express, { type Request, type Response } from 'express';
import { createServer, type Server as HTTPServer } from 'http';
import { join } from 'path';
import { Server as SocketIOServer } from 'socket.io';

type ChatMsg = {
  projectId: string;
  sessionKey: string;
  message: string;
  fromName: string;
  toName: string;
}

const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

const app: express.Application = express();
const server: HTTPServer = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",  
  },
});

app.get('/', (_: Request, res: Response) => {
  res.sendFile(join(process.cwd(), 'index.html'));
});

const sessions = io.of(/^\/session\/\w+$/);

sessions.on("connection", socket => {
  const session = socket.nsp;

  console.log('session', session.name)

  socket.emit('chat', {
    message: "hello from session " + session.name,
    fromName: "server"
  });
  socket.on('chat', (msg: ChatMsg) => {
    console.log('session received chat', msg)
    session.emit('chat', msg)
    io.of('/project/' + msg.projectId).emit('chat', msg)
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
  socket.on('chat', (msg: ChatMsg) => {
    console.log('project received chat', msg)
    project.emit('chat', msg)
    console.log('emit', '/session/' + msg.sessionKey, msg)
    io.of('/session/' + msg.sessionKey).emit('chat', msg)
  })
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
