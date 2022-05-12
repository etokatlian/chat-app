import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

import { Button, Form } from 'react-bootstrap';
import { useSocket } from './hooks/useSocket';
import { BASE_API_URL } from './constants';

function App() {
  const { socket, message } = useSocket();
  const [initialMessages, setInitialMessages] = useState<any>([]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null) as any;

  const fetchInitialMessages = async () => {
    const messages = await axios.get(`${BASE_API_URL}/messages`);
    setInitialMessages(messages.data.data);
  };

  useEffect(() => {
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    setInitialMessages([...initialMessages, message]);
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = () => {
    if (input === '') {
      window.alert('You must enter a message my friend :)');
      return;
    }

    socket.emit('sendMessage', input);
    setInput('');
    scrollToBottom();
  };

  const handleInputChange = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    } else {
      setInput(e.target.value);
    }
  };

  return (
    <div className="App">
      <div className="message-container">
        <div className="message-wrapper">
          {initialMessages.map((message: any, idx: number) => {
            return (
              <div key={idx}>
                <div className="message-date">{moment(message.createdAt).format('LT')}</div>
                <div className="message-bubble">{message.message}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>
      </div>

      <div className="message-input">
        <Form.Control
          type="text"
          onKeyDown={handleInputChange}
          onChange={handleInputChange}
          value={input}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

export default App;
