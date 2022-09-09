import * as axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '5dd923e2-767a-4376-a40f-5e9915581627',
  },
});

export const AUTH_URL =
  'https://accounts.spotify.com/authorize?client_id=8b756100d504472681b8420be7bacfaa&response_type=code&redirect_uri=http://localhost:3000';

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data;
      });
  },
  searchUsers(currentPage = 1, pageSize = 10, term = '', friend) {
    let friendField;
    if (friend !== undefined) {
      friendField = `&friend=${friend}`;
    } else {
      friendField = '';
    }
    return instance
      .get(
        `users?page=${currentPage}&count=${pageSize}&term=${term}${friendField}`
      )
      .then((response) => {
        return response.data;
      });
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};
export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status });
  },
  addPhoto(file) {
    const formData = new FormData();
    formData.append('image', file);
    return instance.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile);
  },
};
export const authAPI = {
  authMe() {
    return instance.get('auth/me').then((response) => {
      return response.data;
    });
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance
      .post('auth/login', { email, password, rememberMe, captcha })
      .then((response) => {
        return response.data;
      });
  },
  logout() {
    return instance.delete('auth/login').then((response) => {
      return response.data;
    });
  },
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  },
};

export const dialogsAPI = {
  getDialogsWithFriend(userId) {
    return instance.get(`dialogs/${userId}/messages`);
  },
  getAllDialogs() {
    return instance.get('dialogs');
  },
  sendMessage(body, userId) {
    if (userId) {
      return instance.post(`dialogs/${userId}/messages`, body);
    } else {
      return 'Choose interlocutor';
    }
  },
  startChatting(userId) {
    return instance.put(`dialogs/${userId}`);
  },
};

let subscribers = [];

let socket;

const closeHandler = () => {
  console.log('Connection to SOCKET failed, try to reconnect');
  setTimeout(createChannel(), 3000);
};

const messageHandler = (e) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((s) => s(newMessages));
};

const createChannel = () => {
  socket?.removeEventListener('close', closeHandler);
  socket?.removeEventListener('message', messageHandler);
  socket?.close();
  socket = new WebSocket(
    'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
  );
  socket.addEventListener('close', closeHandler);
  socket.addEventListener('message', messageHandler);
};

export const chatAPI = {
  startChannel() {
    createChannel();
  },
  stopChannel() {
    subscribers = [];
    socket?.removeEventListener('close', closeHandler);
    socket?.removeEventListener('message', messageHandler);
    socket?.close();
  },
  subscribe(callback) {
    subscribers.push(callback);
  },
  unsubscribe(callback) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage(message) {
    socket?.send(message);
  },
};
