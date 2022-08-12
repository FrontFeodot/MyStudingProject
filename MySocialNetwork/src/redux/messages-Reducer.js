const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  messagesData: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Шо ты' },
    { id: 3, message: 'Какуля' },
  ],

  dialogsData: [
    {
      id: 1,
      name: 'Жора',
      img: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg',
    },
    {
      id: 2,
      name: 'Биба',
      img: 'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg',
    },
    {
      id: 3,
      name: 'Боба',
      img: 'https://i.pinimg.com/550x/a4/1d/da/a41ddae55fef329b4f74295ba758a424.jpg',
    },
    {
      id: 4,
      name: 'Кек',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemptcGoTPz0dHZyiRkcPImp-y8tOX5VGLiA&usqp=CAU',
    },
    {
      id: 5,
      name: 'Чебурек',
      img: 'https://img.tsn.ua/cached/100/tsn-7fb3ba3a1c366fde98f9c353dffa928f/thumbs/1200x630/9b/8d/07f2eaa2cbae555770b7d2e9f4998d9b.jpeg',
    },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody;
      return {
        ...state,
        messagesData: [...state.messagesData, { id: 6, message: body }],
      };
    }
    default:
      return state;
  }
};

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
