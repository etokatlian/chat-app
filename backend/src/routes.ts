import { Router } from 'express';
import { getMessages } from './controllers/messages.controller';

const router = Router();

router.get('/messages', getMessages);

export { router };
