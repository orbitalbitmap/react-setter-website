import { useEffect, useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";
import colorOptions from "../../constants/colorOptions";
import { useGridApiContext } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { setBoulderDistribution } from "../../../../reducers/distribution/distributionReducers";



const BoulderColorPicker = ({ row, field, id, value, }) => {
  const dispatch = useDispatch();
  const [colorName, setColorName] = useState('')
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const currentClimb = { ...row };

  useEffect(() => {setColorName(value)}, [value])

  const handleChange = async (event) => {
    const newClimb = {
      ...currentClimb,
      [field]: event.target.value,
    }

    const tempDist = distribution.filter(climb => climb.id !== newClimb.id)

    const newDistribution = [
      ...tempDist,
      newClimb
    ]

    newDistribution.sort((climbA, climbB) => climbA.id - climbB.id);

    const isValid =  await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    
    if (isValid) {
      dispatch(setBoulderDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id, field });
    }
  }

  return (
    <Box sx={{ width: '100%', minHeight: 0, p: 0, }}>
        <Select
          label="Color"
          labelId="color"
          defaultValue="Pink"
          value={colorName}
          onChange={handleChange}
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

export default BoulderColorPicker