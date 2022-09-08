import style from './ProfileInfo.module.css';
import React, { useState } from 'react';
import { useEffect } from 'react';

const ProfileStatus = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [userStatus, setUserStatus] = useState(props.userStatus);

  useEffect(() => {
    setUserStatus(props.userStatus);
  }, [props.userStatus]);

  const activateEditMode = () => {
    if (props.authorizedId === props.params.userId || !props.params.userId) {
      setEditMode(true);
    }
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(userStatus);
  };

  const onStatusChange = (e) => {
    setUserStatus(e.currentTarget.value);
  };

  return (
    <>
      {' '}
      {!editMode && (
        <span onClick={activateEditMode}>
          <span
            className={
              props.authorizedId === props.params.userId || !props.params.userId
                ? style.status
                : null
            }
          >
            {userStatus || 'No status'}
          </span>
          <br />
          {props.authorizedId === props.params.userId ||
          !props.params.userId ? (
            <span className={style.description}> Click to change</span>
          ) : null}
        </span>
      )}
      {editMode && (
        <input
          autoFocus={true}
          value={userStatus}
          onChange={onStatusChange}
          onBlur={deActivateEditMode}
        />
      )}
    </>
  );
};

export default ProfileStatus;
