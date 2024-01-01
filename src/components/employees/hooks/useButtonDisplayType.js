import { useEffect, useState } from "react";
import useGetUserInfo from "../../../hooks/useGetUserInfo";

const useButtonDisplay = (employeeInfo) => {
  const { userId, userRoleId } = useGetUserInfo();
  const [buttonDisplayType, setButtonDisplayType] = useState('none');

  useEffect(() => {
    const elementDisplayType = (employeeInfo?.id === userId || userRoleId <= 3)
      ? 'block'
      : 'none';

    setButtonDisplayType(elementDisplayType)
  }, [employeeInfo, userId, userRoleId]);

  return buttonDisplayType;
};

export default useButtonDisplay;