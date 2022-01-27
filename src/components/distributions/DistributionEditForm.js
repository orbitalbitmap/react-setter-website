import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DistributionEditForm = (props) => {
  const urlParams = useParams()
  const [distributionSpread, setDistributionSpread] = useState({})
  const [gymId, setGymId] = useState(0)

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`http://localhost:1337/api/${props.path}/${urlParams.id}`)
      const {gymId, gym, ...rest } = data

      setDistributionSpread(rest)
      setGymId(gymId)
    }

    getInfo()
  }, [urlParams, props.path])

  const handleChange = (event) => {
    setDistributionSpread({
      ...distributionSpread,
      [event.target.name]: parseInt(event.target.value) || 0
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form id="distribution-form" >
      <input className="hidden" name="gymId" value={gymId} disabled />
      <div className="grid">
        {
          Object.keys(distributionSpread).map(grade => {
            const formattedGrade = grade.replace('_', '.')
            let numberOfGrade = distributionSpread[grade]
            return (
              <div key={grade} className="distribution-form-div">
                <label className="distribution-form-label" htmlFor={grade}>{formattedGrade}:</label>
                <input
                  onChange={handleChange}
                  className="centered-text"
                  style={{width: '2rem'}}
                  name={grade}
                  type="number"
                  value={numberOfGrade}
                />
              </div>
            )
          })
        }
      </div>
                  <button onClick={handleSubmit} type="submit">Save Distribution</button>
    </form>
  )
}

export default DistributionEditForm