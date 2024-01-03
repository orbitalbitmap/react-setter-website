import { useEffect, useMemo, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddNewEmployeeMutation } from "../../../services/gym";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";

const useNewEmployeeFormInfo = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleId, setRoleId] = useState(0);
  const [employeeGymList, setEmployeeGymList] = useState([]);
  const [currentGymNameList, setCurrentGymNameList] = useState([]);
  const [employeeGymNameList, setEmployeeGymNameList] = useState([]);

  const[
    saveNewEmployee,
    { isLoading, isUpdating, }
  ] = useAddNewEmployeeMutation();

  const loading = useMemo(() => {
    return isLoading || isUpdating;
  }, [isLoading, isUpdating]);

  const handleCheckbox = (event) => {
    const {
      target: { value },
    } = event;
    
    const [gymName] = value.filter(gym => !employeeGymNameList.includes(gym));
    const [gymInfo] = gymName !== undefined ? locations.filter(gym => gym.name === gymName) : [null];

    gymInfo !== null && setEmployeeGymList(employeeGymList.concat(gymInfo));
    setEmployeeGymNameList(value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      roleId,
      gyms: employeeGymList,
    };

    if (!firstName.length || !lastName.length || !email.length || !password.length) {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Missing information, please enter all of the required fields.',
      }));
      
      return;
    }

    try {
      await saveNewEmployee(newUser);
      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'A new employee has been saved!',
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Oops! Looks like something went wrong. Please Try again.',
      }));
    }
  }

  useEffect(() => {
    
    setCurrentGymNameList(locations.map((gym) => gym.name));
  }, [locations]);


  return {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    roleId,
    employeeGymList,
    currentGymNameList,
    employeeGymNameList,
    loading,
    locations,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setPhoneNumber,
    setRoleId,
    handleCheckbox,
    handleSubmit,
  }
};

export default useNewEmployeeFormInfo;