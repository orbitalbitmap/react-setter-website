import Masonry from '@mui/lab/Masonry';

import SectionCardsContainer from './SectionCardsContainer';
import { useGetAllSectionsQuery } from '../../services/gym';

const AllClimbingSections = () => {
  const { data: gyms } = useGetAllSectionsQuery(); 

  return gyms?.length ? ( 
        <Masonry columns={2} spacing={4} sx={{ m: '5rem auto 1rem auto', width: '90%' }}>
          {
            gyms?.map(gym => {
              return (
                <SectionCardsContainer
                  key={gym.id}
                  boulderSections={gym.boulderSections}
                  routeSections={gym.routeSections}
                  gymName={gym.name}
                  gymId={gym.id}
                />
              )
            })
          }
        </Masonry>
      )
    : null 
};

export default AllClimbingSections
