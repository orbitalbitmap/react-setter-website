import { useEffect, useMemo, useState } from "react";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";
import { useDispatch, useSelector } from "react-redux";
import { useGetBoulderDistributionQuery, useGetLocationByIdQuery, useGetSpecificBoulderSectionsQuery, useUpdateBoulderDistributionMutation } from "../../../services/gym";
import { useParams } from "react-router-dom";
import getBoulderColumnDefs from "../utils/boulderColumnDefs";
import { setBoulderDistribution, updateDates } from "../../../reducers/distribution/distributionReducers";
import dayjs from "dayjs";

const useBoulderDistributionChart = () => {
  const dispatch = useDispatch();
  const [
    saveBoulderDistribution,
    { isLoading, isUpdating }
  ] = useUpdateBoulderDistributionMutation();
  const todayFormatted = useMemo(() => {
    const today = new dayjs();
    return today.toISOString().split('T')[0];
  }, []);
  const urlParams = useParams();
  const gymId = urlParams.id;
  const { data, isFetching: isFetchingDistribution, refetch: refetchDistribution } = useGetBoulderDistributionQuery(gymId);
  const { data: sectionList, } = useGetSpecificBoulderSectionsQuery(gymId);
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

  const loading = useMemo(() => {
    return isLoading || isUpdating || isFetchingDistribution;
  }, [isLoading, isUpdating, isFetchingDistribution]);
  
  useEffect(() => {
    data?.length > 0
      ? dispatch(setBoulderDistribution(data))
      : dispatch(setBoulderDistribution(undefined));
  }, [data, dispatch]);


  const distribution = useSelector(state => state.distribution.boulderDistribution);
  const [selectedSectionId, setSelectedSectionId] = useState(1);
  const [fullDateChange, setFullDateChange] = useState(todayFormatted);

  const filteredDistribution = distribution?.filter(climbInfo => climbInfo.sectionId === selectedSectionId);

  const memoizedBoulderColumnDefs = useMemo(() => {
    const boulderColumnDefs = getBoulderColumnDefs(sectionList, employeeList);

    return boulderColumnDefs;
  }, [employeeList, sectionList]);


  const handleSectionChange = (event) => {
    const sectionId = parseInt(event.target.id)

    setSelectedSectionId(sectionId)
  }

  const onDateChange = (event) => {
    dispatch(updateDates({
      type: 'boulderDistribution',
      newDate: fullDateChange.format('YYYY-MM-DD'),
      sectionIdToUpdate: selectedSectionId,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await saveBoulderDistribution(distribution);
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
  }

  const addNewClimb = () => {
    // @TODO: handle the position better

    const newClimb = {
      id: distribution.length + 1,
      gymId: gymId,
      grade: 'VB',
      color: 'Pink',
      setter: 'Guest',
      holds: null,
      style: null,
      sectionId: selectedSectionId,
      dateSet: todayFormatted,
      position: filteredDistribution.length + 1,
    }

    const newDistribution = [...distribution, newClimb];
    dispatch(setBoulderDistribution(newDistribution));
  }

  return {
    filteredDistribution,
    fullDateChange,
    gymId,
    gymName,
    loading,
    memoizedBoulderColumnDefs,
    sectionList,
    selectedSectionId,
    addNewClimb,
    handleSectionChange,
    handleSubmit,
    onDateChange,
    setFullDateChange,
  }
}

export default useBoulderDistributionChart;