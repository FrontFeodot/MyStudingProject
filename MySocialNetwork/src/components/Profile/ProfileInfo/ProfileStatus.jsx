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
    <div>
      {!editMode && (
        <div>
          <span onClick={activateEditMode}>{userStatus || 'No status'}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            autoFocus={true}
            value={userStatus}
            onChange={onStatusChange}
            onBlur={deActivateEditMode}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
