import { Link } from "react-router-dom"

const AdminDashboard = () => {
  return (
    <div className="centered-text">
      <h3>
        <ul>
          <li style={{listStyle: 'none'}}>
            <Link to="/admin/employee/new">Add new setter</Link>
          </li>
          <li style={{listStyle: 'none'}}>
            <Link to="/admin/location/new">Add new gym</Link>
          </li>
        </ul>
      </h3>
    </div>
  )
}

export default AdminDashboard