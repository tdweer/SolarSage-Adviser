import { useState } from 'react'
import { useSalesContext } from "../hooks/useSalesContext"


const SalesForm = () => {
    const { dispatch } = useSalesContext()

   const [salesid, setSalesid] = useState('')
   const [date, setDate] = useState('')
   const [clientid,  setClientid] = useState('')
   const [clientname, setClientname] = useState('')
   const [productinfo, setProductinfo] = useState('')
   const [notes, setNotes] = useState('')
   const [status, setStatus] = useState('')
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields ] = useState([])

   const handleSubmit = async (e) => {
    e.preventDefault()

    const sales = { salesid, date, clientid, clientname, productinfo,  notes, status  }

    const response = await fetch('/api/sales', {
        method: 'POST',
        body: JSON.stringify(sales),
        headers: { 'Content-Type': 'application/json'
     }
    })
    const json = await response.json()

    if (!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if (response.ok){
        setDate('')
        setSalesid('')
        setClientid('')
        setClientname('')
        setProductinfo('')
        setNotes('')
        setStatus('')
        setError(null)
        setEmptyFields([])
        console.log('Sales Added',json)
        dispatch({type: 'CREATE_SALE', payload: json})
}
   }
   return (
    <form className='create' onSubmit={handleSubmit}>
        <h3 className='projecth'>Add a New Sale</h3>

        <label className='lbl'>Sales ID:</label>
        <input 
            type="number"
            onChange={(e) => setSalesid(e.target.value)}
            value={salesid}
            className={emptyFields.includes('salesid') ? 'error' : ''}
        />

        <label className='lbl'>Date:</label>
        <input 
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            className={emptyFields.includes('date') ? 'error' : ''}
        />

        <label className='lbl'>Client ID:</label>
        <input 
            type="text"
            onChange={(e) => setClientid(e.target.value)}
            value={clientid}
            className={emptyFields.includes('clientid') ? 'error' : ''}
        />

        < label className='lbl'>client Name:</label>
        <input 
            type="text"
            onChange={(e) => setClientname(e.target.value)}
            value={clientname}
            className={emptyFields.includes('clientname') ? 'error' : ''}
        />

<        label className='lbl'>Product Information:</label>
        <input 
            type="text"
            onChange={(e) => setProductinfo(e.target.value)}
            value={productinfo}
            className={emptyFields.includes('productinfo') ? 'error' : ''}
        />
        < label className='lbl'>Notes:</label>
        <input 
            type="text"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
            className={emptyFields.includes('notes') ? 'error' : ''}
        />
        < label className='lbl'>Status:</label>
        <input 
            type="text"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            className={emptyFields.includes('status') ? 'error' : ''}
        />
    	
        <button>Add Sale</button>
        {error && <div className='error'>{error}</div>}
    </form>

    )
}

export default SalesForm
