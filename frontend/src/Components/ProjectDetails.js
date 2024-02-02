import { useProjectsContext } from "../hooks/useProjectsContext"

//date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProjectDetails = ({ project }) => {
    const { dispatch } = useProjectsContext()

    //delete project
        const handleClick = async () => {
            const response = await fetch('/api/projects/' + project._id, {
                method: 'DELETE'
            }) 
            const json = await response.json()

            if (response.ok) {
                
                dispatch({type: 'DELETE_PROJECT', payload: json})
            }

    //editproject
    //      const handleEdit = async () => {

    //     console.log('Edit clicked for project ID:', project._id);
    // };
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