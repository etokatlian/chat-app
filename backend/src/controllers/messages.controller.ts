import { RequestHandler, Request } from 'express';
import { Message } from '../models/Message';

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const chatData = await Message.find({}).sort({ createdAt: 1 });
    res.status(200).send({ data: chatData });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: { name: 'UNKNOWN_ERROR', message: 'A server error has occured' } });
  }
};
