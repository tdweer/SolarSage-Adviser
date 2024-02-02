import React from 'react';
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div>
      <Link to="/Projects" className='projectbttn'>
                <button>Projects</button>
      </Link>
      <Link to="/clients" className='projectbttn'> 
                <button>Clients</button>
      </Link>
      <Link to="/staff" className='projectbttn'> 
                <button>Staff</button>
      </Link>
      <Link to="/sales" className='projectbttn'> 
                <button>Sales</button>
      </Link>
    </div>
  );
};

export default Dashboard
