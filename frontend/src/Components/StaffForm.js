import { useState } from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"


const StaffForm = () => {
    const { dispatch } = useProjectsContext()

   const [staffid, setstaffid] = useState('')
   const [name, setname] = useState('')
   const [address, setAddress] = useState('')
   const [contact, setContact] = useState('')
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields ] = useState([])

   const handleSubmit = async (e) => {
    e.preventDefault()

    const staff = { staffid, name, address, contact }

    const response = await fetch('/api/staff', {
        method: 'POST',
        body: JSON.stringify(staff),
        headers: { 'Content-Type': 'application/json'
     }
    })
    const json = await response.json()

    if (!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if (response.ok){
        setname('')
        setstaffid('')
        setAddress('')
        setContact('')
        setError(null)
        setEmptyFields([])
        console.log('Member Added',json)
        dispatch({type: 'ADD_MEMBER', payload: json})
}
   }
   return (
    <form className='create' onSubmit={handleSubmit}>
        <h3 className='projecth'>Add a New Staff Member</h3>

        <label className='lbl'>Member ID:</label>
        <input 
            type="number"
            onChange={(e) => setstaffid(e.target.value)}
            value={staffid}
            className={emptyFields.includes('staffid') ? 'error' : ''}
        />

        <label className='lbl'>Member Name:</label>
        <input 
            type="text"
            onChange={(e) => setname(e.target.value)}
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
            type="text"
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            className={emptyFields.includes('contact') ? 'error' : ''}
        />
    	
        <button>Add Member</button>
        {error && <div className='error'>{error}</div>}
    </form>

    )
}

export default StaffForm
