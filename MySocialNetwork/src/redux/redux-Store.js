import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './auth-reducer';
import profileReducer from './profile-reducer';
import sideBarReducer from './sideBar-reducer';
import usersReducer from './users-reducer';
import appReducer from './app-reducer';
import settingsReducer from './settings-reducer';
import chatReducer from './chat-reducer';

let reducers = combineReducers({
  profilePage: profileReducer,
  sideBar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  settings: settingsReducer,
  chat: chatReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
