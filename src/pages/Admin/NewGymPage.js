import NewGymForm from '../../components/admin/NewGymForm'
import Navbar from '../../components/navbar/Navbar'


const NewGymPage = () => {
  return (
    <>
      <Navbar />
      <div className="centered-text">
        <NewGymForm />
      </div>
    </>
  )
}

export default NewGymPage