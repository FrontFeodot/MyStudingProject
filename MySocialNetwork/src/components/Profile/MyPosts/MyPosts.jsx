import { Form, Formik, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import styleForm from '../../common/FormsControls/formsControl.module.css';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const PostForm = (props) => {
  const formik = useFormik({
    initialValues: {
      newPostText: '',
    },
    validationSchema: Yup.object({
      newPostText: Yup.string().max(300, 'Too much message'),
    }),
    onSubmit: (values) => {
      props.addPost(values.newPostText);
      values.newPostText = '';
    },
  });
  return (
    <Formik initialValues={formik.initialValues} onSubmit={formik.handleSubmit}>
      <Form>
        <div
          className={
            formik.errors.newPostText &&
            formik.touched.newPostText &&
            styleForm.error
          }
        >
          <InputTextarea
            id='newPostText'
            name='newPostText'
            className={styleForm.postForm}
            placeholder='Write your post here'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.newPostText}
          />
          {formik.errors.newPostText && formik.touched.newPostText && (
            <span>{formik.errors.newPostText}</span>
          )}
        </div>
        <Button label='Add post' className='p-button-success' type='submit' />
      </Form>
    </Formik>
  );
};

const MyPosts = React.memo((props) => {
  let postsElement = props.posts.map((post) => (
    <Post
      id={post.id}
      message={post.message}
      key={post.id}
      likesCount={post.likesCount}
      profile={props.profile}
    />
  ));

  return props.authorizedId === props.params.userId || !props.params.userId ? (
    <div className={style.postsBlock}>
      <h3>My posts</h3>
      {!props.params.userId ? (
        <div>
          <PostForm addPost={props.addPost} />
        </div>
      ) : null}
      <div className={style.posts}>{postsElement}</div>
    </div>
  ) : null;
});

export default MyPosts;
