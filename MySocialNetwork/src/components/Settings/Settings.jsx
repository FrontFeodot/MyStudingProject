import { Form, Formik, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import userPhoto from '../../assets/image.png';
import style from './Settings.module.css';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useState } from 'react';

const Settings = ({ profile, saveProfile, addPhoto, errorMessage }) => {
  const [buttonStatus, setButtonStatus] = useState('');
  const formik = useFormik({
    initialValues: {
      fullName: profile.fullName || '',
      lookingForAJob: profile.lookingForAJob || '',
      lookingForAJobDescription: profile.lookingForAJobDescription || '',
      aboutMe: profile.aboutMe || '',
      contacts: {
        facebook: profile.contacts.facebook || '',
        website: profile.contacts.website || '',
        twitter: profile.contacts.twitter || '',
        instagram: profile.contacts.instagram || '',
        youtube: profile.contacts.youtube || '',
        github: profile.contacts.github || '',
        mainLink: profile.contacts.mainLink || '',
      },
    },
    validationSchema: Yup.object({
      fullName: Yup.string().max(25, 'The limit of symbols is exceeded'),
      lookingForAJobDescription: Yup.string().max(
        50,
        'The limit of symbols is exceeded'
      ),
      aboutMe: Yup.string().max(100, 'The limit of symbols is exceeded'),
      contacts: Yup.object({
        facebook: Yup.string().max(50, 'The limit of symbols is exceeded'),
        website: Yup.string().max(50, 'The limit of symbols is exceeded'),
        twitter: Yup.string().max(50, 'The limit of symbols is exceeded'),
        instagram: Yup.string().max(50, 'The limit of symbols is exceeded'),
        youtube: Yup.string().max(50, 'The limit of symbols is exceeded'),
        github: Yup.string().max(50, 'The limit of symbols is exceeded'),
        mainLink: Yup.string().max(50, 'The limit of symbols is exceeded'),
      }),
    }),
    onSubmit: (values) => {
      saveProfile(values);
    },
  });

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      addPhoto(e.target.files[0]);
    }
  };
  return (
    <div className={style.settingsBlock}>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
          onSubmit={formik.handleSubmit}
        >
          <Form>
            <div className={style.currentPhoto}>
              <img src={profile.photos.large || userPhoto} alt='profilePhoto' />

              <input type='file' onChange={onMainPhotoSelected} />
            </div>
            <div className={style.inputs}>
              <div className='p-float-label'>
                <span>FullName:</span>
                <InputText
                  id='fullName'
                  type={'text'}
                  placeholder={'Greg, John, Mari'}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  autoComplete='on'
                />
                {formik.errors.fullName && formik.touched.fullName && (
                  <div className={style.error}>{formik.errors.fullName}</div>
                )}
              </div>
              <div className={style.radioInput}>
                <span>LookingForAJob:</span>
                <label>
                  <RadioButton
                    id='lookingForAJob'
                    name='lookingForAJob'
                    placeholder={''}
                    onBlur={formik.handleBlur}
                    checked={formik.values.lookingForAJob === true}
                    onChange={formik.handleChange}
                    value={true}
                  />
                  Yes
                </label>
                <label>
                  <RadioButton
                    id='lookingForAJob'
                    name='lookingForAJob'
                    placeholder={''}
                    onBlur={formik.handleBlur}
                    checked={formik.values.lookingForAJob === false}
                    onChange={formik.handleChange}
                    value={false}
                  />
                  No
                </label>
              </div>
              <div>
                <span>Skills:</span>
                <InputText
                  id='lookingForAJobDescription'
                  name='lookingForAJobDescription'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.lookingForAJobDescription}
                  autoComplete='on'
                />
                {formik.errors.lookingForAJobDescription &&
                  formik.touched.lookingForAJobDescription && (
                    <div className={style.error}>
                      {formik.errors.lookingForAJobDescription}
                    </div>
                  )}
              </div>
              <div>
                <span>AboutMe:</span>
                <div>
                  <InputTextarea
                    className={style.aboutMe}
                    id='aboutMe'
                    placeholder={''}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.aboutMe}
                    autoComplete='on'
                  />
                  {formik.errors.aboutMe && formik.touched.aboutMe && (
                    <div className={style.error}>{formik.errors.aboutMe}</div>
                  )}
                </div>
              </div>
              <div>
                <span>Facebook:</span>
                <InputText
                  id='contacts.facebook'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.facebook}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.facebook}
                  </div>
                ) : null}
              </div>
              <div>
                <span>Website:</span>
                <InputText
                  id='contacts.website'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.website}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.website}
                  </div>
                ) : null}
              </div>
              <div>
                <span>Twitter:</span>
                <InputText
                  id='contacts.twitter'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.twitter}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.twitter}
                  </div>
                ) : null}
              </div>
              <div>
                <span>Instagram:</span>
                <InputText
                  id='contacts.instagram'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.instagram}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.instagram}
                  </div>
                ) : null}
              </div>
              <div>
                <span>Youtube:</span>
                <InputText
                  id='contacts.youtube'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.youtube}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.youtube}
                  </div>
                ) : null}
              </div>
              <div>
                <span>Github:</span>
                <InputText
                  id='contacts.github'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.github}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.github}
                  </div>
                ) : null}
              </div>
              <div>
                <span>MainLink:</span>
                <InputText
                  id='contacts.mainLink'
                  type={'text'}
                  placeholder={''}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.contacts.mainLink}
                  autoComplete='on'
                />
                {formik.errors.contacts ? (
                  <div className={style.error}>
                    {formik.errors.contacts.mainLink}
                  </div>
                ) : null}
              </div>
            </div>
            <div className={style.saveChangesButton}>
              <Button
                label='Save Changes'
                aria-label='Submit'
                className='p-button-success'
                onClick={() => {
                  setButtonStatus('Success');
                }}
              />
              {Object.keys(formik.errors).length === 1 ? (
                <div className={style.error}>Can't save invalid data</div>
              ) : null}
              {errorMessage ? (
                <div className={style.error}>{errorMessage}</div>
              ) : (
                <div className={style.success}>{buttonStatus}</div>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
