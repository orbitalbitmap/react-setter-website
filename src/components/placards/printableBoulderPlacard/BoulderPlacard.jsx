import { Box, Typography } from '@mui/material';

import BoulderSlot from './BoulderSlot';

const BoulderPlacard = ({ climbList, climbsToDisplay, numberOfClimbsClass, }) => {
  let slotId = 0;
  return (
    <Box className="boulder-placard-container">
      <Box className={`boulder-grid-${numberOfClimbsClass}-column`}>
        {
          climbsToDisplay.map(climbToDisplay => {
            slotId++
            const climb = climbList[climbToDisplay]

            return (
              <BoulderSlot
                key={slotId}
                slotId={slotId}
                color={climb?.color?.toLowerCase()}
                grade={climb?.grade}
                dateSet={climb?.dateSet}
                arete={climb?.areteMessage}
                setter={climb?.setter}
              />
            )
          })
        }
        </Box>
        

        <Box className="boulder-social-grid">
          <Box className="boulder-placard-images">
            <img className="boulder-crg-logo" src="/images/CRG_Logo_Text_M.jpeg" alt="CRG Logo"/>
          </Box>
          <Box className="boulder-placard-images boulder-social-media">
            <img className="boulder-instagram-logo" src="/images/IG_logo.png" alt="Instagram Logo"/>
            <Typography variant="body1" className="boulder-insta-handle">@crgworcester</Typography>
          </Box>
        </Box>
      </Box>
  )
}

export default BoulderPlacard;