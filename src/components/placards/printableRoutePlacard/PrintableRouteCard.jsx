import { useSelector } from 'react-redux';
import { Box, Grid, } from '@mui/material';

import useRoutePlacardInfo from './hooks/useRoutePlacardInfo';
import PlacardSelectors from '../components/PlacardSelectors';
import RoutePlacard from './RoutePlacard';
import SocialsContainer from './components/SocialsContainer';

function PrintableRouteCard() {
  const distribution = useSelector(state => state.distribution.routeDistribution);
  const {
    selectedClimbs,
    handleAreteInfo,
    handleNonAreteInfo,
  } = useRoutePlacardInfo(distribution)

  return (
    <Box sx={{ mt: 12, ml: '5rem', width: '85rem' }}>
      <Grid container spacing={0} >
        <Grid item xs={5} className="noprint">
          <PlacardSelectors
            distribution={distribution}
            handleClimbSelector={handleNonAreteInfo}
            handleAreteSelector={handleAreteInfo}
            startingSlotNum={0} // set to zero as the .map in the component starts by adding 1 to it
            nameList={['climb1', 'climb2', 'climb3']}
            selectorType="route"
          />
        </Grid>

        <Grid item xs={6}>
          <Box className="route-placard-container centered-text">
            <Box className="route-three-grid-column">
              <RoutePlacard
                climbs={selectedClimbs}
                nameList={['climb1', 'climb2', 'climb3']}
              />
            </Box>
            <SocialsContainer />
          </Box>
          
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrintableRouteCard;
