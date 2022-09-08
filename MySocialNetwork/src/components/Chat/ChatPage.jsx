import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import AddMessageForm from './AddMessageForm';
import Messages from './Messages';

const ChatPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
export default React.memo(ChatPage);
