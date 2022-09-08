import React from 'react';
import post from './Post.module.css';
import userPhoto from '../../../../assets/image.png';

function Post(props) {
  return (
    <div className={post.item}>
      <img src={props.profile.photos.large || userPhoto} alt='posts img' />
      {props.message}
      <p>Like {props.likesCount}</p>
    </div>
  );
}
export default Post;
