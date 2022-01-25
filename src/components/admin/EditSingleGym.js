import axios from 'axios'
import { useEffect, useState } from 'react'
import InputAndLabel from '../locations/InputAndLabel'

const EditSingleGym = () => {
  const [gym, setGym] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log(gym)
  }

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get('http://localhost:1337/api/gyms/worcester')

      setGym(data)
    }

    getInfo()
  }, [])

  if (!gym.name) {
    return (<h2>We cannot find the gym you wish to edit.</h2>)
  }

  console.log('render')
  return (
    <>
      <h1 className="centered-text">Edit {gym.name}'s Gym Information</h1>

      <form id="editable-gym-form">
        <div className="employee-form-grid">
          <InputAndLabel
            handleChange={(event) => { setGym({...gym, address: event.target.value})}}
            name="address"
            text="Address"
            value={gym.address}
          />
          
          <InputAndLabel
            handleChange={(event) => { setGym({...gym, phoneNumber: event.target.value})}}
            name="phoneNumber"
            text="Phone number"
            value={gym.phoneNumber}
          />

          <label htmlFor="headSetterId">Head Setter:</label>
          <select name="headSetterId"  onChange={(event) => { setGym({...gym, headSetterId: parseInt(event.target.value)})}} value={gym.headSetterId}>
            {
              gym.employees.map(employee => {
                return (
                  <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
                )
              })
            }
          </select>

          <InputAndLabel
            handleChange={(event) => { setGym({...gym, facebook: event.target.value})}}
            name="facebook"
            text="Facebook page"
            value={gym.facebook}
          />

          <InputAndLabel
            handleChange={(event) => { setGym({...gym, instagram: event.target.value})}}
            name="instagram"
            text="Instagram Account"
            value={gym.instagram}
          />

          <InputAndLabel
            handleChange={(event) => { setGym({...gym, twitter: event.target.value})}}
            name="twitter"
            text="Twitter Account"
            value={gym.twitter}
          />
        </div>
        <button onClick={handleSubmit} type="submit">Update Info</button>
      </form>
    </>
  )
}

  export default EditSingleGym
