import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SpecificGymSection = () => {
  const [gym, setGym] = useState({})
  const [selectedClimbType, setSelectedClimbType] = useState('Boulder')
  const [selectedSectionList, setSelectedSectionList] = useState([])


  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get('http://localhost:1337/api/gymWithSections/1')

      setGym(data)
    }

    getInfo()
  }, [])

  useEffect(() => {
    selectedClimbType === 'Boulder' 
      ? setSelectedSectionList(gym.boulderSections)
      : setSelectedSectionList(gym.routeSections)

  }, [gym, selectedClimbType])

  return (
    <>
      <h1 className="centered-text">{gym.name }</h1>
      <div className="centered-text">
        <select onChange={event => setSelectedClimbType(event.target.value)} value={selectedClimbType}>
          <option value="Boulder">Boulder Sections</option>
          <option value="Route">Route Sections</option>
        </select>
      </div>
      <div className="location-grid">
        <div className={`${selectedClimbType || 'Unavailable'}-locations`}>
          <h3 className="centered-text">{`${selectedClimbType || 'Unavailable'} sections`}</h3>
          <ul>
            {
              selectedSectionList?.map(section => {
                return (
                  <li key={section.id} className="centered-text inside-bullet">{section.name}</li>
                )
              })
            }
          </ul>
        </div>

        <div>
          <h3 className="centered-text">
            <a href={`/gymSections/edit/${gym.id}`}>Edit All Section Names</a>
          </h3>
        </div>
      </div>
    </>
  )
}

export default SpecificGymSection