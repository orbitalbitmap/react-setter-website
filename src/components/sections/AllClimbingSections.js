import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AllClimbingSections = () => {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_PATH}/allGymSections`);

      setGyms(data);
    };

    getInfo();
  }, []);

  const renderSections = (name, sections) => sections.map(section => (
    <li key={`${name}-${section.name}`} className="centered-text inside-bullet">{section.name}</li>
  ));

  return gyms.map(gym => (
    <React.Fragment key={`${gym.name}-sections`}>
      <h1 className="centered-text">{gym.name}</h1>

      <div className="location-grid">
        <div className="boulder-locations">
          <h3 className="centered-text">Boulder sections</h3>
          <ul>
            {
              gym.boulderSections.length > 0
                ? renderSections(gym.name, gym.boulderSections)
                : (<p className="centered-text">No boulder sections found</p>)
            }
          </ul>
        </div>

        <div className="rope-locations">
          <h3 className="centered-text">Rope sections</h3>
          <ul>
            {
              gym.routeSections.length > 0
                ? renderSections(gym.name, gym.boulderSections)
                : (<p className="centered-text">No route sections found</p>)
            }
          </ul>
        </div>

        <div>
          <h4 className="centered-text">
            <Link to={`/sections/edit/${gym.id}`}>Edit All Section Names</Link>
          </h4>
        </div>
      </div>
    </React.Fragment>
  ));
};

export default connect(null, {})(AllClimbingSections);
