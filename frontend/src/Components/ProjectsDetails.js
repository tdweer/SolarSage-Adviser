const ProjectsDetails = ({ project }) => {
    return (
        <div className="project-details">
            <h4>{project.title}</h4>
            <p><strong>Load</strong>{project.load}</p>
            <p><strong>reps</strong>{project.reps}</p>
            <p>{project.createdAt}</p>
        </div>
    )

}

export default ProjectsDetails