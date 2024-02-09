import { useClientsContext } from "../hooks/useClientsContext"

const ClientDetails = ({ client}) =>{
    const { dispatch } = useClientsContext()


//delete project
const handleClick = async () => {
    const response = await fetch('/api/clients/' + client._id, {
        method: 'DELETE'
    }) 
    const json = await response.json()

    if (response.ok) {
        
        dispatch({type: 'DELETE_CLIENT', payload: json})
    }

}
    return(
        <div className="project-details">
            <h4>{client.name}</h4>
            <p><strong>ID-</strong>{client.id}</p>
            <p><strong>Address     -</strong>{client.address}</p>
            <p><strong>Description -</strong>{client.contact}</p>
            {/* <p>{formatDistanceToNow(new Date(project.CreatedAt), { addSuffix: true })}</p> */}
            {/* <span className="material-symbols-outlined" onClick={handleEdit}>Edit</span> */}
            <span className="material-symbols-outlined" onClick={ handleClick }>Delete</span>
        </div>
    )
}

export default ClientDetails