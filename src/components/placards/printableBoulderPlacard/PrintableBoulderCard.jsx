import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

import useBoulderPlacardInfo from './hooks/useBoulderPlacardInfo';
import BoulderPlacard from './BoulderPlacard';
import ClimbsPerPlacardSelector from './components/ClimbsPerPlacardSelector';
import PlacardSelectors from '../components/PlacardSelectors';
import SectionsList from '../../distributions/SectionsList';
import { useGetBoulderDistributionQuery } from '../../../services/gym'
import { useParams } from 'react-router-dom';

const PrintableBoulderCard = () => {
  // const distribution = useSelector(state => state.distribution.boulderDistribution)
  const urlParams = useParams();

  const {data: distribution } = useGetBoulderDistributionQuery(urlParams.id);

  console.log({distribution})
  const {
    currentSection,
    firstPlacardList,
    numberOfClimbsToDisplay,
    placardGridNumber,
    secondPlacardList,
    sectionDistribution,
    sectionList,
    selectedClimbs,
    handleAreteInfo,
    handleNumberOfClimbChange,
    handleNonAreteInfo,
    handleSectionChange,
  } = useBoulderPlacardInfo(distribution, urlParams.id)
  

  return (
    <Box sx={{ mx: 'auto', ml: '10rem', }}>
      <Grid container  spacing={1} className='noprint' sx={{ mt: '5rem', mb: '5rem', textAlign: 'center', width: '40rem', }}>
        <Grid
          item
          xs={6}
          data-testid="climbs-per-placard-container"
        >
          <ClimbsPerPlacardSelector 
            numberOfClimbsToDisplay={numberOfClimbsToDisplay} 
            handleNumberOfClimbChange={handleNumberOfClimbChange}
          />
        </Grid>

        <Grid
          item
          xs={6}
          className="section-selectors-container centered-text"
          sx={{ mx: 'auto', }}
          data-testid="section-selector-container"
        >
          {
            sectionList?.length > 0
              ? <SectionsList sectionList={sectionList} onClick={handleSectionChange} currentSelectedId={currentSection} />
              : null
          }
        </Grid>
      </Grid>

      <Grid
        container
        spacing={6}
        sx={{ mb: '5rem', }}
        data-testid="top-placard-container"
      >
        <Grid item xs={6} className='noprint'>
          <PlacardSelectors
            distribution={sectionDistribution}
            handleClimbSelector={handleNonAreteInfo}
            handleAreteSelector={handleAreteInfo}
            startingSlotNum={0} // set to zero as the .map in the component starts by adding 1 to it
            nameList={firstPlacardList}
            selectorType="boulder"
          />
        </Grid>

        <Grid item xs={6} >
          <BoulderPlacard
            climbList={selectedClimbs}
            climbsToDisplay={firstPlacardList}
            numberOfClimbsClass={placardGridNumber}
          />
        </Grid>
      </Grid>


      <Grid
        container
        spacing={6}
        data-testid="bottom-placard-container"
      >
        <Grid item xs={6} className='noprint'>
          <PlacardSelectors
            class="noprint"
            distribution={sectionDistribution}
            handleClimbSelector={handleNonAreteInfo}
            handleAreteSelector={handleAreteInfo}
            startingSlotNum={numberOfClimbsToDisplay} // set to zero as the .map in the component starts by adding 1 to it
            nameList={secondPlacardList}
            selectorType="boulder"
          />
        </Grid>

        <Grid item xs={6} >
          <BoulderPlacard
            climbList={selectedClimbs}
            climbsToDisplay={secondPlacardList}
            numberOfClimbsClass={placardGridNumber}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PrintableBoulderCard;
