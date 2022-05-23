import { Link } from "react-router-dom"

const AdminLink = (props) => {
  if (props.user.roleId <= 3) {
    return (
      <li className="parent">
        <Link to="/admin">Admin</Link>
      </li>
    )
  }

  return null
}

export default AdminLink