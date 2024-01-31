import { useState } from 'react';
import { useProjectsContext } from "../hooks/useProjectsContext"

const ProjectForm = () => {
    const {dispatch} = useProjectsContext()
    const [title, setTitle] = useState('')
     const [load, setLoad] = useState('')
     const [reps, setReps] = useState('')
     const [error, setError] = useState(null)

     const handleSubmit = async (e) => {
        e.preventDefault()
    
        const project = {title, load, reps}
        
        const response = await fetch('/api/projects', {
          method: 'POST',
          body: JSON.stringify(project),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const json = await response.json()
    
        if (!response.ok) {
          setError(json.error)
        }
        if (response.ok) {
          setError(null)
          setTitle('')
          setLoad('')
          setReps('')
          console.log('new project added:', json)
          dispatch({type: 'CREATE_PROJECT', payload: json})
        }
    
      }

return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New project</h3>

        <label>Excersize Title:</label>
        <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        />

        <label>Load (in kg):</label>
        <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        />

        <label>Number of Reps:</label>
        <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        />

        <button>Add Project</button>
        {error && <div className="error">{error}</div>}
</form>
)
}

export default ProjectForm