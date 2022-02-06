import AdminUpdateEmployee from '../../components/admin/AdminUpdateEmployee'
import Navbar from '../../components/navbar/Navbar'


const AdminUpdateEmployeePage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <AdminUpdateEmployee />
      </div>
    </>
  )
}

export default AdminUpdateEmployeePage