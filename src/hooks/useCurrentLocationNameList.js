import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useCurrentLocationNameList = () => {
  const locations = useSelector(state => state.locations);
  const [currentLocationNameList, setCurrentLocationNameList] = useState([]);

  useEffect(() => {
    setCurrentLocationNameList(locations.map((gym) => gym.name));
  }, [locations]);

  return {
    currentLocationNameList,
  }
}

export default useCurrentLocationNameList;