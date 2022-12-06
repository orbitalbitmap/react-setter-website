import { useEffect, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import colorOptions from "../constants/colorOptions";

const ColorPicker = ({ value, }) => {
  const [colorName, setColorName] = useState('White')

  useEffect(() => {setColorName(value)}, [value])

  return (
    <Box sx={{ width: '100%', minHeight: 0, p: 0, }}>
        <Select
          label="Color"
          labelId="color"
          value={colorName}
          onChange={(event) => {  setColorName(event.target.value)}}
          sx={{
            height: '100%',
            width: '100%',
            p: 0,
          }}
          inputProps={{
            sx: { display: 'flex', flexDirection: 'row', },
          }}
        >
          { 
            colorOptions?.map( colorOption => {
              return (
                <MenuItem
                  key={colorOption.name}
                  value={colorOption.name}
                  sx={{ display: 'flex', flexDirection: 'row', }}
                >
                  <Box
                    sx={{
                      bgcolor: colorOption.hexValue,
                      width: '24px',
                      height: '24px',
                      borderRadius: '0.25rem',
                      border: '1px solid black',
                      mr: 1,
                    }}
                  />
                  {colorOption.name}
                </MenuItem>
              )
            })
          }
        </Select>
    </Box>
  )
}

export default ColorPicker