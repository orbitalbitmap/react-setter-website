import { useEffect, useState } from "react";

const useButtonDisplay = (employee, user) => {
  const [buttonDisplayType, setButtonDisplayType] = useState('none');

  useEffect(() => {
    const elementDisplayType = employee.id === user.id || user.roleId <= 3
      ? 'block'
      : 'none';

    setButtonDisplayType(elementDisplayType)
  }, [employee, user]);

  return buttonDisplayType;
};

export default useButtonDisplay;