import UpdateEmployee from '../../components/employees/UpdateEmployee'
import Navbar from '../../components/navbar/Navbar'


const AdminUpdateEmployeePage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <UpdateEmployee />
      </div>
    </>
  )
}

export default AdminUpdateEmployeePage