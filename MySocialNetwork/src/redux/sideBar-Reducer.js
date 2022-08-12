let initialState = {
  friends: [
    {
      imgSrc: 'https://klike.net/uploads/posts/2019-03/1551511801_1.jpg',
      name: 'Жора',
      nameId: 1,
    },
    {
      imgSrc:
        'https://www.meme-arsenal.com/memes/b877babd9c07f94b952c7f152c4e264e.jpg',
      name: 'Биба',
      nameId: 2,
    },
    {
      imgSrc:
        'https://i.pinimg.com/550x/a4/1d/da/a41ddae55fef329b4f74295ba758a424.jpg',
      name: 'Боба',
      nameId: 3,
    },
  ],
};

const sideBarReducer = (state = initialState, action) => {
  return state;
};
export default sideBarReducer;
