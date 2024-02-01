import { useProjectsContext } from "../hooks/useProjectsContext"

const ProjectDetails = ({ project }) => {
    const { dispatch } = useProjectsContext()

        const handleClick = async () => {
            const response = await fetch('/api/projects/' + project._id, {
                method: 'DELETE'
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
            <p>{project.createdAt}</p>
            <span onClick={ handleClick }>Delete</span>
        </div>
    )
}


export default ProjectDetails