import { useState } from 'react'
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ProjectForm = () => {
    const { dispatch } = useProjectsContext()
    // const { user } = useAuthContext()

   const [pid, setPid] = useState('')
   const [title, setTitle] = useState('')
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
   const [error, setError] = useState(null)
   const [emptyFields, setEmptyFields ] = useState([])

   const handleSubmit = async (e) => {
    e.preventDefault()

    // if (!user){
    //     setError('You must be logged in to add a project')
    //     return
    // }

    const project = { pid, title, address, description }

    const response = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: { 'Content-Type': 'application/json'
        // 'Authorization': `Bearer ${user.token}`
     }
    })
    const json = await response.json()

    if (!response.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if (response.ok){
        setTitle('')
        setPid('')
        setAddress('')
        setDescription('')
        setError(null)
        setEmptyFields([])
        console.log('Project Added',json)
        dispatch({type: 'CREATE_PROJECT', payload: json})
}
   }
   return (
    <form className='create' onSubmit={handleSubmit}>
        <h3 className='projecth'>Add a New Project</h3>

        <label className='lbl'>Project ID:</label>
        <input 
            type="number"
            onChange={(e) => setPid(e.target.value)}
            value={pid}
            className={emptyFields.includes('pid') ? 'error' : ''}
        />

        <label className='lbl'>Project Title:</label>
        <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label className='lbl'>Address:</label>
        <input 
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            className={emptyFields.includes('address') ? 'error' : ''}
        />

        < label className='lbl'>Description:</label>
        <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className={emptyFields.includes('description') ? 'error' : ''}
        />
    	
        <button>Add Project</button>
        {error && <div className='error'>{error}</div>}
    </form>

    )
}

export default ProjectForm
