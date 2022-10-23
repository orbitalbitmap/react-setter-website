import React from 'react';

import ClimbSelector from './ClimbSelector';
import AreteSelector from './AreteSelector';
import { Box, Grid, Typography } from '@mui/material';

function ClimbSelectors(props) {
  let slotNumber = props.startingSlotNum;
  return (
    <Box className={props.class} sx={{ position: 'absolute', left: '10rem', width: "40rem" }} >
      <Grid container>
        {
          props.nameList.map((climbName) => {
            slotNumber++;
            return (
              <Grid item xs={6} >
                <Box key={climbName} className={`${props.selectorType}-selectors`}>
                  <Typography>Slot #{slotNumber}</Typography>
                  <Box sx={{ border: '1px solid gray', p: 2}} >
                    <ClimbSelector
                      name={climbName}
                      handleClimbSelector={props.handleClimbSelector}
                      climbs={props.distribution}
                      selectorType="boulder"
                    />

                    <AreteSelector
                      name={climbName}
                      onChange={props.handleAreteSelector}
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

export default ClimbSelectors;
