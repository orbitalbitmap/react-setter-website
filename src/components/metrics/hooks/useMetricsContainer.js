import { useDispatch, useSelector } from "react-redux";
import { useGetGymMetricsQuery } from "../../../services/gym";
import { setGymMetrics } from "../../../reducers/distribution/metricsReducers";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useMetricsContainer = () => {
  const urlParams = useParams();
  const dispatch = useDispatch();
  const gymName = useSelector((state) => state.metrics.gymName);
  const gymMetrics = useSelector((state) => state.metrics.gymMetrics);
  const {data} = useGetGymMetricsQuery(urlParams.id, { refetchOnMountOrArgChange: true, });

  useEffect(() => {
    dispatch(setGymMetrics({
      gymName: '',
      gymMetrics: undefined,
    }));

    const getInfo = async () => {
      dispatch(setGymMetrics({
        gymName: data?.gymName || '',
        gymMetrics: data?.metrics || {},
      }));
    };

    getInfo();
  }, [data, dispatch, gymName, urlParams]);

  return {
    gymMetrics,
    gymName,
  };
}

export default useMetricsContainer;