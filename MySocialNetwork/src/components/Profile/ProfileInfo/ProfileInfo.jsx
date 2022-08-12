import { Form, Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import userPhoto from '../../../assets/image.png';
import Preloader from '../../common/Preloader/Preloader';
import style from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
  const [isShown, setIsShown] = useState(false); //Hook to show or hide 'addPhoto' item

  //FORMIK
  const formik = useFormik({
    initialValues: { photoUrl: '' },
    onSubmit: (values) => {
      debugger;
      props.addPhoto(values.photoUrl);
    },
  });

  //END OF FORMIK

  const openAddPhotoItem = (event) => {
    setIsShown((current) => !current);
  };

  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={style.descriptionBlock}>
        <img
          className={style.ava__img}
          src={props.profile.photos.large || userPhoto}
          alt='profilePhoto'
        />
        {props.authorizedId === props.params.userId || !props.params.userId ? (
          <div>
            <input type='button' value='Add photo' onClick={openAddPhotoItem} />
          </div>
        ) : null}

        {/*Form to add Profile Photo (hidden on default) */}
        {isShown ? (
          <div>
            <Formik
              initialValues={formik.initialValues}
              onSubmit={formik.handleSubmit}
            >
              <Form>
                <input
                  id='photoUrl'
                  name='photoUrl'
                  placeholder='Enter URL of your image'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.photoUrl}
                  type='text'
                />
                <button type='submit'>Add photo</button>
              </Form>
            </Formik>
          </div>
        ) : null}

        <ProfileStatus
          userStatus={props.userStatus}
          updateUserStatus={props.updateUserStatus}
          authorizedId={props.authorizedId}
          params={props.params}
        />

        <div>FullName: {props.dataAvailability(props.profile.fullName)}</div>
      </div>
    </div>
  );
};

export default ProfileInfo;
