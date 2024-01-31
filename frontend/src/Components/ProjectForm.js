import { useState } from 'react'

const ProjectForm = () => {
   const [pid, setPid] = useState('')
   const [title, setTitle] = useState('')
   const [address, setAddress] = useState('')
   const [description, setDescription] = useState('')
   const [error, setError] = useState(null)

   const handleSubmit = async (e) => {
    e.preventDefault()

    const project = { pid, title, address, description }

    const response = await fetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(project),
        headers: { 'Content-Type': 'application/json'
     }
    })
    const json = await response.json()

    if (!response.ok){
        setError(json.error)
    }
    if (response.ok){
        setTitle('')
        setPid('')
        setAddress('')
        setDescription('')
        setError(null)
        console.log('Project Added',json)
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
        />

        <label className='lbl'>Project Title:</label>
        <input 
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <label className='lbl'>Address:</label>
        <input 
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
        />

        < label className='lbl'>Description:</label>
        <input 
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />
    	
        <button>Add Project</button>
        {error && <div className='error'>{error}</div>}
    </form>

    )
}

export default ProjectForm
