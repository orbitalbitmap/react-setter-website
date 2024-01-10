import ClimbSelector from './ClimbSelector';
import AreteSelector from './AreteSelector';
import { Box, Grid, Typography } from '@mui/material';

const PlacardSelectors =({
  distribution,
  class: className,
  nameList,
  selectorType,
  startingSlotNum,
  handleAreteSelector,
  handleClimbSelector,
})  => {
  let slotNumber = startingSlotNum;

  return (
    <Box className={className} sx={{ width: '40rem', }}>
      <Grid container>
        {
          nameList.map((climbName) => {
            slotNumber++;
            return (
              <Grid item xs={5} key={climbName} data-testid="climb-selector-container">
                <Box className={`${selectorType}-selectors`}>
                  <Typography>Slot #{slotNumber}</Typography>
                  <Box sx={{ border: '1px solid gray', p: 2}} >
                    <ClimbSelector
                      name={climbName}
                      handleClimbSelector={handleClimbSelector}
                      climbs={distribution}
                      selectorType="boulder"
                    />

                    <AreteSelector
                      name={climbName}
                      onChange={handleAreteSelector}
                    />
                  </Box>
                </Box>
              </Grid>
            );
          })
        }
      </Grid>
    </Box>
  );
}

export default PlacardSelectors;
