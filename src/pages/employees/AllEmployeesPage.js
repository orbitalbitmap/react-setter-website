import EmployeesList from '../../components/employees/EmployeesList'
import Navbar from '../../components/navbar/Navbar'


const AllLocationsPage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <EmployeesList />
      </div>
    </>
  )
}

export default AllLocationsPage