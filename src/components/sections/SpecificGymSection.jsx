import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SectionCardsContainer from './SectionCardsContainer';


const SpecificGymSection = () => {
  const urlParams = useParams()
  const [gym, setGym] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/gymWithSections/${urlParams.id}`)
      setGym(data)
    }

    getInfo()
  }, [urlParams])

  const renderInfo = () => {
    return (
      <div style={{ margin: '5rem auto 0', width: '50%', }}>
        <SectionCardsContainer
          key={gym.id}
          boulderSections={gym.boulderSections}
          routeSections={gym.routeSections}
          gymName={gym.name}
          gymId={gym.id}
        />
      </div>
    )
  }

  return gym.id 
    ? renderInfo()
    : null
}

export default SpecificGymSection