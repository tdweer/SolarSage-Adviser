import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Dashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [projectCount, setProjectCount] = useState(0);


  useEffect(() => {
    // Fetch deposit data when the component mounts
    fetch('/api/deposits')
      .then((response) => response.json())
      .then((data) => setDeposits(data))
      .catch((error) => console.error('Error fetching deposits:', error))

        // Fetch project count 
        fetch('/api/projects')
        .then((response) => response.json())
        .then((data) => {
          console.log("Received project count:", data.count); // Log the received count
          setProjectCount(data.count);
        })
        .catch((error) => console.error('Error fetching project count:', error));
 
  }, [])



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
      
      {/* Display recent deposits within a Card */}
      <Card variant="outlined" style={{ margin: '10px', maxWidth: '400px', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <h2 className='deposits' style={{ marginBottom: '20px', }}>Total Earning/Monthly</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {deposits.map((deposit, index) => (
              <li key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <p style={{ margin: 0 }}>Amount: ${deposit.amount.toFixed(2)}</p>
                <p style={{ margin: 0 }}>Date: {deposit.date}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
             {/* Display project count within a Card */}
             <Card variant="outlined" style={{ margin: '10px', maxWidth: '400px', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <CardContent>
            <h2 className='deposits' style={{ marginBottom: '20px', }}>Project Count</h2>
            <p>{projectCount}</p>
          </CardContent>
        </Card>
    </div>
  );
};

export default Dashboard;
