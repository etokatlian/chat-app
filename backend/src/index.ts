import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Message } from './models/Message';
import { router } from './routes';

require('dotenv').config();

const PORT = 3001;
const app: express.Application = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(PORT, () => {
  console.log(`--- Server listening on PORT ${PORT} ---`);
});

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(router);

io.on('connection', async (io: any) => {
  io.on('sendMessage', function (msg: any) {
    io.broadcast.emit('broadcastMessage', { message: msg });

    const chatMessage = new Message({ message: msg });
    saveMessage(chatMessage);
  });
});

const saveMessage = async (message: any) => {
  await message.save();
};

const init = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/chatdb`);
  } catch (e) {
    console.log('ERROR CONNECTING TO DB - ', e);
  }
};

init();
