import axios from 'axios'
import { useEffect, useState } from 'react'

const NewGymForm = () => {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [headSetterId, setHeadSetterId] = useState(0)
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const getInfo = async () =>{
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/employees`)

      setEmployees(data)
    }

    getInfo()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post(`${process.env.REACT_APP_API_PATH}/saveNewGym`, {
      name,
      address,
      phoneNumber,
      headSetterId,
      facebook,
      instagram,
      twitter,
    })
  }

  return ( 
    <>
      <h1 className="centered-text">New's Gym Information</h1>

      <form action="/api/updateGymInfo" method="post" id="editable-gym-form">
        <div className="employee-form-grid">
          <label htmlFor="name">Name:</label>
          <input onChange={(event) => setName(event.target.value)} name="name" value={name} />
          <label htmlFor="address">Address:</label>
          <input onChange={(event) => setAddress(event.target.value)} name="address" value={address} />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input onChange={(event) => setPhoneNumber(event.target.value)} name="phoneNumber" value={phoneNumber} />
          
          <label htmlFor="headSetterId">Head Setter:</label>
          <select onChange={(event) => setHeadSetterId(event.target.value)} name="headSetterId" defaultValue={0}>
          <option value={0}>Please select a setter...</option>
            
            {
              employees.map(employee => {
                return (    
                  <option key={employee.id} value={employee.id}>{`${employee.firstName} ${employee.lastName}`}</option>
                )
              })
            }
          </select>
          <label htmlFor="facebook">Facebook Page:</label>
          <input onChange={(event) => setFacebook(event.target.value)} name="facebook" value={facebook} />
          <label htmlFor="instagram">Instagram Account:</label>
          <input onChange={(event) => setInstagram(event.target.value)} name="instagram" value={instagram} />
          <label htmlFor="twitter">Twitter Account:</label>
          <input onChange={(event) => setTwitter(event.target.value)} name="twitter" value={twitter} />
        </div>
        <button onClick={handleSubmit} type="submit">Update Info</button>
      </form>
    </>
  )
}

export default NewGymForm