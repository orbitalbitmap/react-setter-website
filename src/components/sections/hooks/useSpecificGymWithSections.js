import { useGetSectionsForSpecificGymQuery } from "../../../services/gym";

const useSpecificGymWithSections = (urlParams) => {
  const {data} = useGetSectionsForSpecificGymQuery(urlParams?.id)

  return {
    gym: data,
  };
}

export default useSpecificGymWithSections;