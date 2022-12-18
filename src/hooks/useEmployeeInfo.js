import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useEmployeeInfo = (urlId) => {
  const employeesList = useSelector(state =>  state.employees);
  const locations = useSelector(state =>  state.locations);
  const [employee, setEmployee] = useState({});
  const [employeeLocationNameList, setEmployeeLocationNameList] = useState([]);

  const handleChange = (event) => {
    setEmployee({
        ...employee,
        [event.target.name]: event.target.value
      });
  };

  const handleCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    let newGymList;

    // the if executes adding info the else removes info form the employee's gym list
    if (value.length > employeeLocationNameList.length) {
      // find the gym name in the updated multi-select value that is not in the employeeGymList
      const [gymNameToAdd] = value.filter(
        (gym) => !employeeLocationNameList.includes(gym),
      );
      // get the missing gym to add to the employee's gyms list
      const [gymInfo] = locations.filter((gym) => {
        return gym.name === gymNameToAdd});
      // set a new gymList
      newGymList = employee.gyms.concat(gymInfo);
    } else {
      // find the gym name in the employeeGymList that is not in the updated multi-select value
      const [gymNameToRemove] = employeeLocationNameList.filter(
        (gym) => !value.includes(gym),
      );
      // remove gym from the employee's gyms list and set newGymList to the new list
      newGymList = employee.gyms.filter((gym) => gym.name !== gymNameToRemove);
    }
    setEmployee({ ...employee, gyms: newGymList });
    setEmployeeLocationNameList(value);
  };

  useEffect(() => {
    const employeeInfo = employeesList.find(emp => {
      return emp.id === urlId
    });

    setEmployee({
        ...employeeInfo,
        oldEmployeeGymList: employeeInfo.gyms,
        password: 'NotYourRealPassword'
      });
    setEmployeeLocationNameList(employeeInfo.gyms.map(gym => gym.name));
  }, [employeesList, urlId]);

  return {
    employee,
    employeeLocationNameList,
    handleChange,
    handleCheckbox,
  }
}

export default useEmployeeInfo;