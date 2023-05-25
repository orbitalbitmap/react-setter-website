import { Box, Typography } from '@mui/material';

const RoutePlacard = ({ climbs, nameList, }) => {
  return (
    <>
      {
        nameList.map(climbName => {
          return (
            <Box key={climbName} className={`route-slot-grid placard-${climbs[climbName].color?.toLowerCase()}`}>
              <Typography variant="body" className="route-grade-value">{climbs[climbName].grade}</Typography>
              <Typography variant="body" className="route-name">{climbs[climbName].name}</Typography>
              <Typography variant="body" className="route-arete">{climbs[climbName].areteMessage}</Typography>
              <Typography variant="body" className="route-placard-info">{climbs[climbName].ropeStyle}</Typography>
              <Typography variant="body" className="route-placard-info">{climbs[climbName].dateSet}</Typography>
              <Typography variant="body" className="route-placard-info">{climbs[climbName].setter}</Typography>
            </Box>
          )
        })
      }
    </>
  )
}

export default RoutePlacard