import { useState } from 'react'
import { useClientsContext } from "../hooks/useClientsContext"

const ClientForm = () => {
    const { dispatch } = useClientsContext()

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

 
    const handleSubmit = async (e) => {
     e.preventDefault()
 
     const client = { id, name, address, contact }
 
     const response = await fetch('/api/clients', {
         method: 'POST',
         body: JSON.stringify(client),
         headers: { 'Content-Type': 'application/json'
      }
     })
     const json = await response.json()
 
     if (!response.ok){
         setError(json.error)
         setEmptyFields(json.emptyFields || [])
     }
     if (response.ok){
        setName('')
        setId('')
         setAddress('')
         setContact('')
         setError(null)
         setEmptyFields([])
         console.log('Client Added',json)
         dispatch({type: 'CREATE_CLIENT', payload: json})
 }
    }
    return (
     <form className='create' onSubmit={handleSubmit}>
         <h3 className='projecth'>Add a New Client</h3>
 
         <label className='lbl'>Client ID:</label>
         <input 
             type="number"
             onChange={(e) => setId(e.target.value)}
             value={id}
             className={emptyFields.includes('id') ? 'error' : ''}
         />
 
         <label className='lbl'>Client Name:</label>
         <input 
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
             className={emptyFields.includes('name') ? 'error' : ''}
         />
 
         <label className='lbl'>Address:</label>
         <input 
             type="text"
             onChange={(e) => setAddress(e.target.value)}
             value={address}
             className={emptyFields.includes('address') ? 'error' : ''}
         />
 
         < label className='lbl'>Contact:</label>
         <input 
             type="number"
             onChange={(e) => setContact(e.target.value)}
             value={contact}
             className={emptyFields.includes('contact') ? 'error' : ''}
         />
         
         <button>Add Project</button>
         {error && <div className='error'>{error}</div>}
     </form>
 
     )
 }
 
 export default ClientForm