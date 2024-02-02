import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Link to="/Projects" className='projectbttn'> {/* Link to the ProjectsPage component */}
                <button>Projects</button>
            </Link>
    </div>
  );
};

export default Dashboard
