import { useEffect, useMemo, useState } from "react";
import { useGetLocationByIdQuery, useUpdateLocationMutation } from "../../../services/gym";
import { useDispatch } from "react-redux";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";

const useGetGymInfo = (gymId) => {
  const dispatch = useDispatch();
  const [gym, setGym] = useState({});
  const { data, refetch: refetchLocationInfo, isFetching: isFetchingLocationInfo, } = useGetLocationByIdQuery(gymId);
  console.log({id: gymId })
  const [
    updateLocation,
    { isLoading, isUpdating, }
  ] = useUpdateLocationMutation();

  const loading = useMemo(() => {
    return isLoading || isUpdating || isFetchingLocationInfo;
  }, [isLoading, isUpdating, isFetchingLocationInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await updateLocation(gym);

      await refetchLocationInfo();

      dispatch(setNotificationAlert({
        alertType: 'success',
        messageBody: 'The gym\'s information has been saved!'
      }));
    } catch {
      dispatch(setNotificationAlert({
        alertType: 'error',
        messageBody: 'Oops! Looks like something went wrong. Please Try again.'
      }));
    }
  }

  useEffect(() => {
    setGym(data)
  }, [data]);

  console.log({
    gym,
    loading,
    handleSubmit,
    setGym,
  })

  return {
    gym,
    loading,
    handleSubmit,
    setGym,
  }
};

export default useGetGymInfo;