import { useEffect, useMemo, useState } from "react";
import { setRouteDistribution, updateDates } from "../../../reducers/distribution/distributionReducers";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";
import getRopeColumnDefs from "../utils/ropeColumnDefs";
import { useDispatch, useSelector } from "react-redux";
import { useGetLocationByIdQuery, useGetRouteDistributionQuery, useGetSpecificRouteSectionsQuery, useUpdateRouteDistributionMutation } from "../../../services/gym";
import { useParams } from "react-router-dom";

const useRouteDistributionChart = () => {
  const urlParams = useParams();
  const gymId = urlParams.id;
  const todayFormatted = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]
}, []);
  
  const dispatch = useDispatch();
  const [
    saveRouteDistribution,
    { isLoading, isUpdating }
  ] = useUpdateRouteDistributionMutation();

  const { data, isFetching: isFetchingDistribution, refetch: refetchDistribution, } = useGetRouteDistributionQuery(gymId);
  const { data: sectionList, } = useGetSpecificRouteSectionsQuery(gymId);
  const { data: gymInfo, } = useGetLocationByIdQuery(gymId);
  const {employeeList, gymName} = useMemo(() => {
    let employeeList = [];
    let gymName = '';

    if (gymInfo?.id) {
      employeeList = gymInfo?.employees;
      gymName = gymInfo?.name;
    }
    return {
      employeeList,
      gymName,
    }
  }, [gymInfo]);

  const distribution = useSelector(state => state.distribution.routeDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);
  
  const columns = useMemo(() => {
    const ropeColumnDefs = getRopeColumnDefs(sectionList, employeeList);
    return ropeColumnDefs;
}, [sectionList, employeeList]);

const loading = useMemo(() => {
  return isLoading || isUpdating || isFetchingDistribution;
}, [isLoading, isUpdating, isFetchingDistribution]);

  useEffect(() => {
    if(data?.length > 0) {
      dispatch(setRouteDistribution(data));
    }
  }, [data, dispatch]);

  const filteredDistribution = distribution?.filter(climbInfo => climbInfo.sectionId === selectedSectionId);

  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setSelectedSectionId(sectionId)
  }

  const addNewClimb = () => {
    const station = filteredDistribution.length
      ? filteredDistribution[filteredDistribution.length - 1].station
      : 1
  
    const newClimb = {
      id: distribution.length + 1,
      gymId: gymId,
      sectionId: selectedSectionId,
      station,
      ropeStyle: 'Top Rope Only',
      grade: '5.5',
      color: 'Pink',
      setter: 'Guest',
      climbName: '',
      dateSet: todayFormatted,
    }
  
    const newDistribution = [...distribution, newClimb];
    dispatch(setRouteDistribution(newDistribution));
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await saveRouteDistribution(distribution);
      await refetchDistribution();
      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'The distribution has been saved!'
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'There was an issue saving the distribution, please try again.'
      }));
    }
  };

  const onDateChange = (event) => {
    dispatch(updateDates({
      type: 'routeDistribution',
      newDate: fullDateChange,
      sectionIdToUpdate: selectedSectionId,
    }));
  };

  return {
    columns,
    filteredDistribution,
    fullDateChange,
    gymId,
    gymName,
    loading,
    selectedSectionId,
    sectionList,
    addNewClimb,
    handleSectionChange,
    handleSubmit,
    onDateChange,
    setFullDateChange,
  }
}

export default useRouteDistributionChart;