import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const useGetUserInfo = () => {
  const [cookies, setCookie] = useCookies(['userId', 'userRoleId', 'userLocations']);

    const [userId, setUserId] = useState(null);
    const [userRoleId, setUserRoleId] = useState(null);
    const [userLocations, setUserLocations] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(false)

  useEffect(() => {
    setUserId(cookies.userId);
    setUserRoleId(cookies.userRoleId);
    setUserLocations(cookies.userLocations);
    setShouldRefresh(false);

  }, [cookies, shouldRefresh]);

  const updateUserLocations = (newUserLocationList) => {
    setCookie('userLocations', newUserLocationList);
    setShouldRefresh(true);
  }

  return {
    userId,
    userRoleId,
    userLocations,
    shouldRefresh,
    setShouldRefresh,
    updateUserLocations,
  }
}

export default useGetUserInfo;