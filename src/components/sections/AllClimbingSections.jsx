import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SectionCardsContainer from './SectionCardsContainer';
import { Masonry } from '@mui/lab'

const AllClimbingSections = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/allGymSections`);

      setGyms(data);
    };

    getInfo();
  }, []);

  return (
    <Masonry columns={2} spacing={4} sx={{ m: '5rem auto 1rem auto', width: '80%' }}>
      {
        gyms?.map(gym => {
          return (
            <SectionCardsContainer
              key={gym.id}
              boulderSections={gym.boulderSections}
              routeSections={gym.routeSections}
              gymName={gym.name}
              gymId={gym.id}
            />
          )
        })
      }
    </Masonry>  
  )
};

export default AllClimbingSections
