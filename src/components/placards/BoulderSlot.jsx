import { Box } from '@mui/material';
import React from 'react';

// @TODO: remove props
function BoulderSlot(props) {
  return (
    <Box className="boulder-slot-grid">
      <Box className={`boulder-grades placard-${props.color}`}>
        <p className="boulder-grade-value">{props.grade}</p>
        <p className="boulder-arete">{props.arete}</p>
      </Box>
      <Box className="boulder-date-set">
        <p className="boulder-date-value">{props.dateSet}</p>
      </Box>
      <Box className="boulder-setter-name">
        <p className="boulder-setter-value">{props.setter}</p>
      </Box>
    </Box>
  );
}

export default BoulderSlot;
