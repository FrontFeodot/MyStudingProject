import { chatAPI } from '../api/api';

const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      return {
        ...state,
        messages: [...state.messages, ...action.messages].filter(
          (m, index, array) => index >= array.length - 40
        ),
      };
    }
    default: {
      return state;
    }
  }
};

const messagesReceived = (messages) => ({
  type: MESSAGES_RECEIVED,
  messages,
});

let _newMessageHandler = null;
const newMessageHandlerCreator = (dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

export const startMessagesListening = () => async (dispatch) => {
  chatAPI.startChannel();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = () => async (dispatch) => {
  chatAPI.stopChannel();
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
};

export const sendMessage = (message) => async (dispatch) => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
