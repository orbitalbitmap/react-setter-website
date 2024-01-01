import { useParams } from 'react-router-dom';
import SectionCardsContainer from './SectionCardsContainer';
import useSpecificGymWithSections from './hooks/useSpecificGymWithSections';


const SpecificGymSection = () => {
  const urlParams = useParams();
  const { gym } = useSpecificGymWithSections(urlParams);

  const renderInfo = () => {
    return (
      <div
        style={{ margin: '5rem auto 0', width: '50%', }}
        data-testid="specific-sections-container"
      >
        <SectionCardsContainer
          key={gym.id}
          boulderSections={gym.boulderSections}
          routeSections={gym.routeSections}
          gymName={gym.name}
          gymId={gym.id}
        />
      </div>
    )
  }

  return gym?.id ? renderInfo() : null;
}

export default SpecificGymSection;