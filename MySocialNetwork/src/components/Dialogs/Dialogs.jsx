import React from 'react';
import style from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import NewMessageForm from './NewMessageForm/NewMessageForm';

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogsData.map((dialog) => (
    <DialogItem
      name={dialog.name}
      key={dialog.id}
      id={dialog.id}
      img={dialog.img}
    />
  ));

  let messagesElements = state.messagesData.map((message) => (
    <Message id={message.id} key={message.id} message={message.message} />
  ));

  if (!props.isAuth) return <Navigate to={'/Login'} />;

  return (
    <div className={style.dialogs}>
      <div className={style.dialogsElements}>{dialogsElements}</div>
      <div className={style.messages}>
        <div>{messagesElements}</div>
        <div></div>
        <NewMessageForm sendMessage={props.sendMessage} />
      </div>
    </div>
  );
};

/* const ReduxNewMessageForm = reduxForm({
  form: 'newMessageBody',
})(NewMessageForm); */
export default Dialogs;
