import Navbar from '../../components/navbar/Navbar'

const AdminPage = () => {
  return (
    <>
      <Navbar />
      <div>
        <ul>
          <li>
            <a href="/admin/employee/new">New Employee</a>
          </li>
          <li>
            <a href="/admin/location/new">New Location</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default AdminPage