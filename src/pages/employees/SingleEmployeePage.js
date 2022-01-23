import SingleEmployee from '../../components/employees/SingleEmployee'
import Navbar from '../../components/navbar/Navbar'


const AllLocationsPage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <SingleEmployee />
      </div>
    </>
  )
}

export default AllLocationsPage