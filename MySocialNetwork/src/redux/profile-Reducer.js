import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const ADD_PHOTO_SUCCESS = 'ADD_PHOTO_SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: 'Hi! This is my first post!', likesCount: '5' },
    {
      id: 2,
      message: 'If you see this message - you are the best!',
      likesCount: '5000',
    },
    {
      id: 3,
      message:
        'To my regret, all added posts don`t save, because API not ready for this',
      likesCount: '1',
    },
  ],
  profile: null,
  userStatus: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };

      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    case UPDATE_NEW_POST_TEXT: {
      return {
        ...state,
        newPostText: action.newText,
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case SET_STATUS: {
      return { ...state, userStatus: action.userStatus };
    }
    case ADD_PHOTO_SUCCESS: {
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }

    default:
      return state;
  }
};

export const addPostCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});
export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId,
});
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (userStatus) => ({
  type: SET_STATUS,
  userStatus,
});

export const addPhotoSuccess = (photos) => ({
  type: ADD_PHOTO_SUCCESS,
  photos,
});

export const getProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(response));
};

export const getUserStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));
};
export const updateUserStatus = (userStatus) => async (dispatch) => {
  let response = await profileAPI.updateStatus(userStatus);
  if (response.resltCode === 0) {
    dispatch(setUserStatus(userStatus));
  }
};

export const updateNewPostTextCreator = (text) => ({
  type: UPDATE_NEW_POST_TEXT,
  newText: text,
});

export const addPhoto = (file) => async (dispatch) => {
  let response = await profileAPI.addPhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(addPhotoSuccess(response.data.data.photos));
  }

  return response;
};

export default profileReducer;
