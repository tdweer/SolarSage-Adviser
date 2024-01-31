const ProjectDetails = ({ project }) => {
    return (
        <div className="project-details">
            <h4>{project.title}</h4>
            <p><strong>ID-</strong>{project.pid}</p>
            <p><strong>Address     -</strong>{project.address}</p>
            <p><strong>Description -</strong>{project.description}</p>
            <p>{project.createdAt}</p>
        </div>
    )
}


export default ProjectDetails