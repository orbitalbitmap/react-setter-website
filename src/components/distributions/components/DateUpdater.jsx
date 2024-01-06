import dayjs from 'dayjs';
import React from 'react';
import { Box, Button, } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

function DateUpdater({ fullDateChange, setFullDateChange, onDateChange }) {
  return (
    <Box className="date-updater-container" data-testid="date-updater-container">
      <DatePicker
        value={dayjs(fullDateChange)}
        onChange={setFullDateChange}
        sx={{ width: '11rem',  }}
      />
      <Button
        variant="contained"
        className="date-updater button"
        type="button"
        onClick={onDateChange}
        sx={{ height: '15rem', }}
      >
        Set Current Dates
      </Button>
    </Box>
    )
  }

export default DateUpdater