import React from 'react';
import post from './Post.module.css';

function Post(props) {
  return (
    <div className={post.item}>
      <img src='https://i.imgur.com/dmRcOOI.png' alt='posts img' />
      {props.message}
      <p>Like {props.likesCount}</p>
    </div>
  );
}
export default Post;
