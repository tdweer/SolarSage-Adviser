import React from 'react'
import { useEffect, useState } from 'react'


//components
import ClientDetails from "../Components/ClientDetails"

const Clients = () => {
  const [clients, setClients] = useState(null)
  // const { Clients, dispatch} = useProjectsContext()

  useEffect (() => {
    const fetchClients = async() => {
      const response = await fetch('/api/clients')
      const json  = await response.json()

      if (response.ok) {
        setClients(json)
    }
   }
    fetchClients()
  },[])


  return (
    <div className='clients'>
      <div className='clients'>
      {clients && clients.map((client) => (
        <ClientDetails key={client._id} client={client}/>

      ))}




      </div>
    
  
    </div>
  );
};

export default Clients;
