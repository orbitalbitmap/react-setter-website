import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import SectionCardsContainer from './SectionCardsContainer';


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
  <Grid key="gym-card-list-container" container sx={{ m: '0 auto', }}>
  {
    gyms?.map(gym => {
      return (
        <SectionCardsContainer
          key={gym.id}
          boulderSections={gym.boulderSections}
          routeSections={gym.routeSections}
          gymName={gym.name}
        />
      )
      })
      
      }
  </Grid>
  )
};


export default AllClimbingSections
