import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const AdminLink = () => {
  const userRoleId = useSelector(state => state.user.roleId)
  if (userRoleId <= 3) {
    return (
      <li className="parent">
        <Link to="/admin">Admin</Link>
      </li>
    )
  }

  return null
}

export default AdminLink