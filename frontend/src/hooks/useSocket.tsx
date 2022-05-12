import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { BASE_API_URL } from '../constants';

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<any>({});

  useEffect(() => {
    const newSocket = io(BASE_API_URL, {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['websocket'],
      agent: false,
      upgrade: false,
      rejectUnauthorized: false,
    });
    setSocket(newSocket);

    newSocket.on('broadcastMessage', (data: any) => {
      setMessage(data);
    });
  }, [setSocket]);

  return { socket, message };
};
