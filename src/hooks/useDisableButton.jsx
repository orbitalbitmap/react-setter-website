import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useDisableButton = (employeeId, urlId) => {
  const userRoleId = useSelector(state => state.user.roleId);
  const [disableSaveButton, setDisableSaveButton] = useState();

  useEffect(() => {
    const shouldDisable = userRoleId > 3 || employeeId !== urlId

    setDisableSaveButton(shouldDisable)
  }, [employeeId, userRoleId, urlId]);

  return {
    disableSaveButton,
  };
};

export default useDisableButton;