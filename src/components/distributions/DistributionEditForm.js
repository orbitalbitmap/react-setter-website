import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DistributionEditForm(props) {
  const urlParams = useParams();
  const [distributionSpread, setDistributionSpread] = useState({});
  const [gymId, setGymId] = useState(0);

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/${props.path}/${urlParams.id}`);
      const { gymId, gym, ...rest } = data;

      setDistributionSpread(rest);
      setGymId(gymId);
    };

    getInfo();
  }, [urlParams, props.path]);

  const handleChange = (event) => {
    const newSpread = {
      ...distributionSpread,
      [event.target.name]: parseInt(event.target.value) || 0,
    };
    setDistributionSpread(newSpread);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${process.env.REACT_APP_API_PATH}/saveDistribution/${props.type}`, { gymId, distributionSpread });
  };

  return (
    <form id="distribution-form">
      <input className="hidden" name="gymId" value={gymId} disabled />
      <div className="grid">
        {
          Object.keys(distributionSpread).map((grade) => {
            const displayedGrade = props.type === 'routes'
              ? grade.replace('_', '.')
              : grade;
            const numberOfGrade = distributionSpread[grade];
            return (
              <div key={grade} className="distribution-form-div">
                <label className="distribution-form-label" htmlFor={grade}>
                  {displayedGrade}
                  :
                </label>
                <input
                  onChange={handleChange}
                  className="centered-text"
                  style={{ width: '2rem' }}
                  name={grade}
                  value={numberOfGrade}
                />
              </div>
            );
          })
        }
      </div>

      <button onClick={handleSubmit} type="submit">Save Distribution</button>
    </form>
  );
}

export default DistributionEditForm;
