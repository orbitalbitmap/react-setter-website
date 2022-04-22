import { Link } from 'react-router-dom';

function AdminLink(props) {
  if (props.user.roleId <= 3) {
    return (
      <li className="parent">
        <Link to="/admin">Admin</Link>
      </li>
    );
  }

  return null;
}

export default AdminLink;
