import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// gets the locations object from state and reduces it to an array that is just the names of the locations
const useCurrentLocationNameList = () => {
  const locations = useSelector(state => state.locations);
  const [currentLocationNameList, setCurrentLocationNameList] = useState([]);

  useEffect(() => {
    locations?.length > 0
      ? setCurrentLocationNameList(locations.map((gym) => gym.name))
      : setCurrentLocationNameList([])
  }, [locations]);

  return {
    currentLocationNameList,
  }
}

export default useCurrentLocationNameList;