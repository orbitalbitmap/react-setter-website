import { Box, Typography } from '@mui/material'
import React from 'react'

// @TODO: remove props
const RoutePlacard = (props) => {
  return (
    <>
      {
        props.nameList.map(climbName => {
          return (
            <Box key={climbName} className={`route-slot-grid placard-${props.climbs[climbName].color?.toLowerCase()}`}>
              <Typography variant="body" className="route-grade-value">{props.climbs[climbName].grade}</Typography>
              <Typography variant="body" className="route-name">{props.climbs[climbName].name}</Typography>
              <Typography variant="body" className="route-arete">{props.climbs[climbName].areteMessage}</Typography>
              <Typography variant="body" className="route-placard-info">{props.climbs[climbName].ropeStyle}</Typography>
              <Typography variant="body" className="route-placard-info">{props.climbs[climbName].dateSet}</Typography>
              <Typography variant="body" className="route-placard-info">{props.climbs[climbName].setter}</Typography>
            </Box>
          )
        })
      }
    </>

  )
}

export default RoutePlacard