import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import InputAndLabel from '../locations/InputAndLabel'

const EditSingleGym = () => {
  const urlParams = useParams()
  const [gym, setGym] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/updateGymInfo`, gym)
  }

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/gymById/${urlParams.id}`)

      setGym(data)
    }

    getInfo()
  }, [urlParams])

  if (!gym.name) {
    return (<h2>We cannot find the gym you wish to edit.</h2>)
  }

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
