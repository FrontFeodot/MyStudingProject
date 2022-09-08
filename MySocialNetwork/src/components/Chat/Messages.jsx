import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import style from './chat.module.css';
import Message from './Message';

const Messages = () => {
  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <div className={style.messages}>
      {messages ? (
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              userName={message.userName}
              message={message.message}
              photo={message.photo}
              userId={message.userId}
            />
          );
        })
      ) : (
        <Preloader />
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default Messages;
