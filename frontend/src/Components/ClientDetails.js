const ClientDetails = ({ client}) =>{


    return(
        <div className="project-details">
            <h4>{client.name}</h4>
            <p><strong>ID-</strong>{client.id}</p>
            <p><strong>Address     -</strong>{client.address}</p>
            <p><strong>Description -</strong>{client.contact}</p>
            {/* <p>{formatDistanceToNow(new Date(project.CreatedAt), { addSuffix: true })}</p> */}
            {/* <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span> */}
            {/* <span className="material-symbols-outlined" onClick={ handleClick }>Delete</span> */}
        </div>
    )
}

    export default ClientDetails