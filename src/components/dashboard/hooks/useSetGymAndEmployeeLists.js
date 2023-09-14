import { useDispatch, } from "react-redux";
import { useEffect, } from "react";
import { useGetAllEmployeesAndGymsQuery } from "../../../services/gym";
import { setGymList } from "../../../reducers/locationReducers";
import { setEmployeeList } from "../../../reducers/employeeReducers";


const useSetGymAndEmployeeLists = () => {
  const dispatch = useDispatch();
  const {data} = useGetAllEmployeesAndGymsQuery();


  useEffect(() => {
    if (data) {
      dispatch(setGymList({ gyms: data.locationData }));
      dispatch(setEmployeeList({ employees: data.employeeData }));
    }
  }, [dispatch, data]);
}

export default useSetGymAndEmployeeLists;