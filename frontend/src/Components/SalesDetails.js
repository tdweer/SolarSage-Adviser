const SalesDetails = ({ sales}) =>{


    return(
        <div className="project-details">
            <h4>{sales.salesid}</h4>
            <p><strong>Date-</strong>{sales.date}</p>
            <p><strong>Client ID     -</strong>{sales.clientid}</p>
            <p><strong>Client Name -</strong>{sales.clientname}</p>
            <p><strong>Product info -</strong>{sales.productinfo}</p>
            <p><strong>Notes </strong>{sales.notes}</p>
            <p><strong>Status -</strong>{sales.status}</p>
            {/* <p>{formatDistanceToNow(new Date(project.CreatedAt), { addSuffix: true })}</p> */}
            {/* <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span> */}
            {/* <span className="material-symbols-outlined" onClick={ handleClick }>Delete</span> */}
        </div>
    )
}

    export default SalesDetails