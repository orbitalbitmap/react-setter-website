import { useGridApiContext } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRouteDistribution } from "../../../reducers/distribution/distributionReducers";


const useRouteColorPicker = (row, field, id, value) => {
  const dispatch = useDispatch();
  const [colorName, setColorName] = useState('')
  const apiRef = useGridApiContext();
  const distribution = useSelector(state => state.distribution.routeDistribution);
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
      dispatch(setRouteDistribution(newDistribution));
      apiRef.current.stopCellEditMode({ id, field });
    }
  }

  return {
    colorName,
    handleChange,
  }
}

export default useRouteColorPicker;