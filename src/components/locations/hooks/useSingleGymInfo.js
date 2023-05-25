import { useEffect, useState } from "react";
import { useGetLocationByIdQuery } from "../../../services/gym";

const useSingleGymInfo = (urlParams) => {
  const [gymInfo, setGymInfo] = useState([]);
  const [fullTimeEmployeeList, setFullTimeEmployeeList] = useState([]);
  const [headSetter, setHeadSetter] = useState({});
  const [partTimeEmployeeList, setPartTimeEmployeeList] = useState([]);

  const { data } = useGetLocationByIdQuery(urlParams.id);

  useEffect(() => {
    setGymInfo(data ? data : []);
    }, [data]);

  useEffect(() => {
    setHeadSetter(gymInfo?.employees?.find(employee => employee.id === gymInfo.headSetterId));
    setFullTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId <= 4 && employee.id !== gymInfo.headSetterId && employee.id !== 1));
    setPartTimeEmployeeList(gymInfo?.employees?.filter(employee => employee.roleId === 5));
  }, [gymInfo])

  return {
    gymInfo,
    fullTimeEmployeeList,
    headSetter,
    partTimeEmployeeList,
  };
};

export default useSingleGymInfo