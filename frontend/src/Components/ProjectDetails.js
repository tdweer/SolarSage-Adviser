import { useProjectsContext } from '../hooks/useProjectsContext'
import { useAuthContext } from  '../hooks/useAuthContext'


const ProjectDetails = ({ project }) => {
    const { dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    //delete project
        const handleClick = async () => {
            if (!user){
                return
            }
            const response = await fetch('/api/projects/' + project._id, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${user.token}` 
                }
            }) 
            const json = await response.json()

            if (response.ok) {
                
                dispatch({type: 'DELETE_PROJECT', payload: json})
            }


}
    return (
        <div className="project-details">
            <h4>{project.title}</h4>
            <p><strong>ID-</strong>{project.pid}</p>
            <p><strong>Address     -</strong>{project.address}</p>
            <p><strong>Description -</strong>{project.description}</p>
            {/* <p>{formatDistanceToNow(new Date(project.CreatedAt), { addSuffix: true })}</p> */}
            {/* <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span> */}
            <span className="material-symbols-outlined" onClick={ handleClick }>Delete</span>
            
        </div>
    )
}


export default ProjectDetails
