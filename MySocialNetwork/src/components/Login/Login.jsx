import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-Reducer.js';
import { Navigate } from 'react-router-dom';
import style from '../common/FormsControls/formsControl.module.css';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';

const LoginForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: 'false',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required field'),
      password: Yup.string()
        .required('Required field')
        .max(20, 'Must be 20 symbols or less')
        .min(4, 'Must be 4 or more symbols'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      props.login(values.email, values.password, values.rememberMe, setStatus);
      setSubmitting(false);
    },
  });

  return (
    <>
      <Formik
        initialValues={formik.initialValues}
        validateOnBlur
        onSubmit={formik.handleSubmit}
        validationSchema={formik.validationSchema}
      >
        <Form>
          <div
            className={
              formik.errors.email && formik.touched.email && style.error
            }
          >
            <input
              id='email'
              type={'text'}
              placeholder={'email'}
              name={'email'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete='on'
            />
            {formik.errors.email && formik.touched.email && (
              <span>{formik.errors.email}</span>
            )}
          </div>

          <div
            className={
              formik.errors.password && formik.touched.password && style.error
            }
          >
            <input
              id='password'
              placeholder={'password'}
              name={'password'}
              type={'password'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete='on'
            />
            {formik.errors.password && formik.touched.password && (
              <span>{formik.errors.password}</span>
            )}
          </div>

          <div>
            <input name={'rememberMe'} type={'checkbox'} />
            Remember Me
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          <div className={style.invalidLogin}>{formik.status}</div>
        </Form>
      </Formik>
    </>
  );
};

const Login = (props) => {
  if (props.isAuth) {
    return <Navigate to={'/profile'} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginForm login={props.login} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
