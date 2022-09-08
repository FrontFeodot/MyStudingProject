import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../redux/chat-reducer';
import style from './chat.module.css';

const AddMessageForm = () => {
  const dispatch = useDispatch();
  const [newMessageBody, setNewMessageBody] = useState('');

  const sendMessageHandler = () => {
    if (!newMessageBody) {
      return;
    } else {
      dispatch(sendMessage(newMessageBody));
      setNewMessageBody('');
    }
  };
  return (
    <div>
      <form onSubmit={sendMessageHandler}>
        <div>
          <InputTextarea
            id='aboutMe'
            className={style.textarea}
            placeholder={''}
            autoComplete='on'
            value={newMessageBody}
            onChange={(e) => {
              setNewMessageBody(e.target.value);
            }}
          />
        </div>
        <div>
          {' '}
          <Button
            label='Send message'
            aria-label='Submit'
            className={'p-button-success ' + style.textarea}
            onClick={sendMessageHandler}
            disabled={false}
          />
        </div>
      </form>
    </div>
  );
};
export default AddMessageForm;
