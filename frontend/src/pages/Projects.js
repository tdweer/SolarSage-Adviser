import { useEffect } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"


//components
import ProjectDetails from "../Components/ProjectDetails"
import ProjectForm from "../Components/ProjectForm"
import SideTab from "../Components/SideTab"



const Projects = () => {

    const  { projects, dispatch } = useProjectsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/projects', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                 }
             })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PROJECTS', payload: json})
            }
        }

         if (user){
        fetchProjects()
        }
    // }, [dispatch])
     }, [dispatch, user])
    


    return (
      <div className="flex flex-row">
       <div className="flex-none">
        <SideTab/>
      </div>
      <div className="flex-1">

     
        <div className="projects">
            {projects && projects.map((project) => (
                <ProjectDetails project = {project} key = {project._id} />
            ))}
        </div>
        <ProjectForm />
      </div>
      </div>
    )
  }
  
  export default Projects