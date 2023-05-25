import { Box } from '@mui/material';

function BoulderSlot({ arete, color, dateSet, grade, setter, }) {
  return (
    <Box className="boulder-slot-grid">
      <Box className={`boulder-grades placard-${color}`}>
        <p className="boulder-grade-value">{grade}</p>
        <p className="boulder-arete">{arete}</p>
      </Box>
      <Box className="boulder-date-set">
        <p className="boulder-date-value">{dateSet}</p>
      </Box>
      <Box className="boulder-setter-name">
        <p className="boulder-setter-value">{setter}</p>
      </Box>
    </Box>
  );
}

export default BoulderSlot;
