import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateClimbingSections = () => {
  const urlParams = useParams()
  const gymId = urlParams.id
  const [gym, setGym] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`http://localhost:1337/api/gymWithSections/${gymId}`)

      setGym(data)
    }

    getInfo()
  }, [gymId])

  const handleChange = (event) => {
    let sectionType = event.target.dataset.sectiontype
    let updatedSectionList = [...gym[sectionType]]
    const updatedSectionId = parseInt(event.target.dataset.gymid)-1

    updatedSectionList[updatedSectionId] = {
      ...updatedSectionList[updatedSectionId],
      name: event.target.value
    }

    setGym({
        ...gym,
        [sectionType]: updatedSectionList
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const type = event.target.name
    const sectionToUpdate = type === 'Boulder'
      ? gym.boulderSections
      : gym.routeSections

    await axios.post(`http://localhost:1337/api/update${type}SectionNames`, {gymId, sectionToUpdate})
  }

  const addNewSection = (event) => {
    const sectionType = event.target.dataset.sectiontype
    const newSectionId = gym[sectionType].length + 1
    
    const updatedGym = {...gym}

    updatedGym[sectionType] = [
      ...updatedGym[sectionType],
        {
          id: newSectionId,
          gymId: gym.id,
          name: ''
        }
    ]

    setGym(updatedGym)
  }

  const renderSectionForm = (sections, type) => {
    return sections.map(section => {
      return (    
        <div key={`${type}-section-${section.id}`} className="gym-section-grid">
          <input className="hidden" name="id" value={section.id} disabled />
          <label htmlFor="name">Name:</label>
          <input
            onChange={handleChange}
            name="name"
            value={section.name !== null ? section.name : ''}
            data-sectiontype={`${type}Sections`}
            data-gymid={section.id}
            placeholder="Enter section name..."
          />
        </div>
      )
    })
  }

  return (
    <>
      <h1 className="centered-text">{gym.name}</h1>
      <form action="/api/updateRouteSectionNames" method="post" className="editable-section-form">
        <h1 className="centered-text">Ropes</h1>
        <div className="section-details" id="route-sections">
          {
            gym.routeSections
              ? renderSectionForm(gym.routeSections, 'route')
              : (<h2>No Route Sections Found.</h2>)
          }
        </div>
        
        <div className="section-button-container">
          <button className="section-button" type="button" onClick={addNewSection} data-sectiontype="routeSections">Add New Section</button>
          <button className="section-button" name="Route" onClick={handleSubmit} type="submit">Save Info</button>
        </div>
      </form>

      <form action="/api/updateBoulderSectionNames" method="post" className="editable-section-form">
        <input className="hidden" name="gymId" value={gym.id} disabled />
        <h1 className="centered-text">Boulders</h1>
        <div className="section-details" id="boulder-sections">
        {
            gym.boulderSections
              ? renderSectionForm(gym.boulderSections, 'boulder')
              : (<h2>No Boulder Sections Found.</h2>)
          }
        </div>
        <div className="section-button-container">
          <button className="section-button" type="button" onClick={addNewSection} data-sectiontype="boulderSections">Add New Section</button>
          <button className="section-button" name="Boulder" onClick={handleSubmit} type="submit">Save Info</button>
        </div>
      </form>
    </>
  )
}

export default UpdateClimbingSections