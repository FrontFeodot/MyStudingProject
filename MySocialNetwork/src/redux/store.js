import dialogsReducer from './Messages-Reducer';
import profileReducer from './Profile-Reducer';
import sideBarReducer from './SideBar-Reducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Привет, это мой первый пост', likesCount: '5' },
        { id: 1, message: 'А это второй', likesCount: '25' },
        { id: 1, message: 'Даб даааа яяя', likesCount: '1005' },
      ],
      newPostText: 'Enter message of your post here',
    },
    messagesPage: {
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
      newMessageBody: '',
    },
    sideBar: {
      friends: [
        {
          imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg',
          name: 'Жора',
        },
        {
          imgSrc:
            'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg',
          name: 'Биба',
        },
        {
          imgSrc:
            'https://i.pinimg.com/550x/a4/1d/da/a41ddae55fef329b4f74295ba758a424.jpg',
          name: 'Боба',
        },
      ],
    },
  },
  _callSubscriber() {
    console.log('state changed');
  },
  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesData = dialogsReducer(this._state.messagesPage, action);
    this._state.sideBar = sideBarReducer(this._state.sideBar, action);

    this._callSubscriber(this._state);
  },
};

export default store;
