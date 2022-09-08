import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer.js';
import { Navigate } from 'react-router-dom';
import style from '../common/FormsControls/formsControl.module.css';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { useState } from 'react';

const LoginForm = (props) => {
  const [rememberMe, setRememberMe] = useState();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: rememberMe,
      captcha: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required field'),
      password: Yup.string()
        .required('Required field')
        .max(20, 'Must be 20 symbols or less')
        .min(4, 'Must be 4 or more symbols'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      props.login(
        values.email,
        values.password,
        values.rememberMe && false,
        values.captcha,
        setStatus
      );
      setSubmitting(false);
    },
  });
  return (
    <>
      <Formik
        className={style.loginForm}
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
            <span>Email:</span>
            <span className={style.email}>
              <InputText
                id='email'
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
            </span>
          </div>

          <div
            className={
              formik.errors.password && formik.touched.password && style.error
            }
          >
            <span>Password:</span>
            <Password
              className={style.password}
              id='password'
              placeholder={'password'}
              name={'password'}
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
            <TriStateCheckbox
              name={'rememberMe'}
              id={'rememberMe'}
              value={rememberMe}
              onChange={(e) => {
                setRememberMe(e.value);
              }}
            />
            <span> Remember Me</span>
          </div>
          {props.captchaUrl && (
            <div>
              <img
                className={style.captcha}
                src={props.captchaUrl}
                alt='captcha'
              />
              <InputText
                id='captcha'
                placeholder={'captcha'}
                name={'captcha'}
                type={'captcha'}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.captcha}
                autoComplete='on'
              />
            </div>
          )}
          <div className={style.submitButton}>
            <Button label='Submit' type='submit' />
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
    <div className={style.login}>
      <h1>Login</h1>
      <LoginForm login={props.login} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
