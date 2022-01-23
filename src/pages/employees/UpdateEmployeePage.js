import UpdateEmployee from '../../components/employees/UpdateEmployee'
import Navbar from '../../components/navbar/Navbar'


const UpdateEmployeePage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <UpdateEmployee />
      </div>
    </>
  )
}

export default UpdateEmployeePage