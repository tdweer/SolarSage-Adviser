import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"

const ProjectForm = () => {

    const { user } = useAuthContext()

    const [pid, setPid] = useState('')
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user){
            setError('You must be logged in to add a project')
            return
        }

        const project = { pid, title, address, description }

        const response = await fetch('/api/projects', {
            method: 'POST',
            body: JSON.stringify(project),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok){
            alert('Project Added')
            setTitle('')
            setPid('')
            setAddress('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('Project Added', json)
            // dispatch({type: 'CREATE_PROJECT', payload: json})
        }
    }

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-md rounded'>
            <h3 className='text-xl font-semibold mb-6 text-center'>Add a New Project</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Project ID:</label>
                    <input 
                        type="number"
                        onChange={(e) => setPid(e.target.value)}
                        value={pid}
                        className={`mt-1 block w-full px-3 py-2 border ${emptyFields.includes('pid') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Project Title:</label>
                    <input 
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className={`mt-1 block w-full px-3 py-2 border ${emptyFields.includes('title') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Address:</label>
                    <input 
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className={`mt-1 block w-full px-3 py-2 border ${emptyFields.includes('address') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700'>Description:</label>
                    <input 
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className={`mt-1 block w-full px-3 py-2 border ${emptyFields.includes('description') ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                </div>

                <button type="submit" className='mt-5 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                    Add Project
                </button>
                {error && <div className='mt-2 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
                    {error}
                </div>}
            </form>
        </div>
    )
}

export default ProjectForm
