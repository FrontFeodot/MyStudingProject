import profileReducer, { addPostCreator, deletePost } from './profile-Reducer';

let state = {
  posts: [
    { id: 1, message: 'Привет, это мой первый пост', likesCount: '5' },
    { id: 2, message: 'А это второй', likesCount: '25' },
    { id: 3, message: 'Даб даааа яяя', likesCount: '1005' },
  ],
};

it('length of posts should be incremented', () => {
  let action = addPostCreator('ne bag a ficha');
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(4);
});

it('posts length should be decrimented', () => {
  let action = deletePost(2);
  let newState = profileReducer(state, action);

  expect(newState.posts[1].message).toBe('Даб даааа яяя');
});
