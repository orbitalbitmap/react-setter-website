import { useEffect, useMemo, useState } from "react";
import { setNotificationAlert } from "../../../reducers/notificationsReducers";
import { useGetGymWithSectionsQuery, useUpdateSectionsMutation } from "../../../services/gym";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const useUpdateClimbingSection = () => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const gymId = urlParams.id;
  const [gym, setGym] = useState({});
  const { data, isFetching: isFetchingGymWithSections, refetch: refetchGymWithSections,} = useGetGymWithSectionsQuery(gymId);

  const [
    updateSections,
    // @TODO: set up loading and error handling
    {isLoading, isUpdating}
  ] = useUpdateSectionsMutation();

  const loading = useMemo(() => {
    return isLoading || isUpdating || isFetchingGymWithSections;
  }, [isLoading, isUpdating, isFetchingGymWithSections]);
  
  useEffect(() => {
    const getInfo = async () => {
      setGym(data);
    };

    getInfo();
  }, [data]);

  const handleChange = (event, sectionType, sectionId) => {
    const updatedSectionList = [...gym[sectionType]];
    const updatedSectionId = parseInt(sectionId) - 1;

    updatedSectionList[updatedSectionId] = {
      ...updatedSectionList[updatedSectionId],
      name: event.target.value,
    };

    setGym({
      ...gym,
      [sectionType]: updatedSectionList,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const type = event.target.name;
    const sectionToUpdate = type === 'Boulder'
      ? gym?.boulderSections
      : gym?.routeSections;

    try {
      await updateSections({type, sectionToUpdate})
      await refetchGymWithSections();
      dispatch(setNotificationAlert({
    alertType: 'success',
    messageBody: 'The sections info has been saved!',
  }));
    } catch {
      dispatch(setNotificationAlert({
    alertType: 'error',
    messageBody: 'Oops! Looks like something went wrong. Please Try again.',
  }));
    }
  };

  const addNewSection = (event, sectionType) => {
    const newSectionId = gym[sectionType].length + 1;
    const updatedGym = { ...gym };

    updatedGym[sectionType] = [
      ...updatedGym[sectionType],
      {
        id: newSectionId,
        gymId: gym?.id,
        name: '',
      },
    ];

    setGym(updatedGym);
  };

  return {
    gym,
    loading,
    addNewSection,
    handleChange,
    handleSubmit,
  }
}

export default useUpdateClimbingSection;