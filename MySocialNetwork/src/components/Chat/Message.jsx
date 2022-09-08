import { Avatar } from 'primereact/avatar';
import { NavLink } from 'react-router-dom';
const Message = ({ userName, message, photo, userId }) => {
  return (
    <div>
      <NavLink
        style={{ textDecoration: 'none', color: 'black' }}
        to={'/profile/' + userId}
      >
        <Avatar image={photo} size='xlarge' />
        <b>{userName}</b>
        <br />
        <span>{message}</span>
      </NavLink>
      <hr />
    </div>
  );
};
export default Message;
