import { Box, } from '@mui/material';

import BoulderSlot from './BoulderSlot';
import BoulderSocialsContainer from './components/BoulderSocialsContainer';

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

        <BoulderSocialsContainer />
      </Box>
  )
}

export default BoulderPlacard;