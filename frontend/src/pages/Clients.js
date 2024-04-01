import { useEffect } from 'react'
import { useClientsContext } from '../hooks/useClientsContext'

//components
import ClientDetails from "../Components/ClientDetails"
import ClientForm from '../Components/ClientForm'

const Clients = () => {

  const { clients, dispatch} = useClientsContext()

  useEffect (() => {
    const fetchClients = async() => {
      const response = await fetch('/api/clients')
      const json  = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_CLIENTS', payload:json})
    }
   }
    fetchClients()
  },[dispatch])


  return (
    <div className='Projects'>
      <div className='projects'>
      {clients && clients.map((client) => (
        <ClientDetails client = {client} key= {client._id}/>

      ))}
      </div>
    <ClientForm/>
  
    </div>
  )
}

export default Clients
