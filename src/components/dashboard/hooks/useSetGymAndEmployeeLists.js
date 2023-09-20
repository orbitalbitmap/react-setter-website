import { useDispatch, } from "react-redux";
import { useEffect, } from "react";
import { useGetAllEmployeesQuery, useGetAllLocationsQuery } from "../../../services/gym";
import { setGymList } from "../../../reducers/locationReducers";
import { setEmployeeList } from "../../../reducers/employeeReducers";


const useSetGymAndEmployeeLists = () => {
  const dispatch = useDispatch();
  const allEmployeesResponse = useGetAllEmployeesQuery();
  const allGymsResponse = useGetAllLocationsQuery();

  useEffect(() => {
    if (allEmployeesResponse?.data && allGymsResponse?.data) {
      dispatch(setGymList({ gyms: allGymsResponse.data }));
      dispatch(setEmployeeList({ employees: allEmployeesResponse.data }));
    }
  }, [dispatch, allEmployeesResponse, allGymsResponse]);
}

export default useSetGymAndEmployeeLists;