import { useEffect, useMemo, useState } from "react";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";
import { useGetDistributionEditFormDataQuery, useUpdateIdealDistributionMutation } from "../../../services/gym";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


const useDistributionEditForm = (path, type) => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const [distributionSpread, setDistributionSpread] = useState({});
  const [gymId, setGymId] = useState(0);
  const [gym, setGym] = useState('')

  const { data, refetch: refetchDistribution, isFetching: isFetchingDistribution } = useGetDistributionEditFormDataQuery({path, gymId: urlParams.id});
  const [
    updateIdealDistribution,
    { isLoading, isUpdating }
  ] = useUpdateIdealDistributionMutation();

  const loading = useMemo(() => {
    return isLoading || isUpdating || isFetchingDistribution;
  }, [isLoading, isUpdating, isFetchingDistribution]);

  useEffect(() => {
    const getInfo = async () => {
        if (data?.gymId) {
          const { gym, gymId, ...rest } = data;
          setDistributionSpread(rest);
          setGym(gym)
          setGymId(gymId);
        }
      
    };

    getInfo();
  }, [data, gymId]);

  const handleChange = (event) => {
    const newSpread = {
      ...distributionSpread,
      [event.target.name]: parseInt(event.target.value) || 0,
    };
    setDistributionSpread(newSpread);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await updateIdealDistribution({
        type,
        body: {
          gymId,
          distributionSpread,
        },
      });
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

  return {
    distributionSpread,
    gym,
    loading,
    handleChange,
    handleSubmit,
  };
}

export default useDistributionEditForm;