const AdminDashboard = () => {
  return (
    <div className="centered-text">
      <h3>
        <ul>
          <li style={{listStyle: 'none'}}>
            <a href="/newEmployee">Add new setter</a>
          </li>
          <li style={{listStyle: 'none'}}>
            <a href="/admin/newGym">Add new gym</a>
          </li>
        </ul>
      </h3>
    </div>
  )
}

export default AdminDashboard