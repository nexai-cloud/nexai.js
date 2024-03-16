import express, { type Request, type Response } from 'express';
import { createServer, type Server as HTTPServer } from 'http';
import { join } from 'path';
import { Server as SocketIOServer, type Socket } from 'socket.io';

const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

const app: express.Application = express();
const server: HTTPServer = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
  },
});

app.get('/', (_: Request, res: Response) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket: Socket) => {
  console.log('socket connection', socket.client.conn.remoteAddress)
  socket.on('chat', (msg: string) => {
    console.log('message: ' + msg);
    io.emit('chat', msg);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
