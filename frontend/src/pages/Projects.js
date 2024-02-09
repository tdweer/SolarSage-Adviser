import { useEffect } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
import { useAuthContext } from "../hooks/useAuthContext"


//components
import ProjectDetails from "../Components/ProjectDetails"
import ProjectForm from "../Components/ProjectForm"



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
      <div className="Projects">
        <div className="projects">
            {projects && projects.map((project) => (
                <ProjectDetails project = {project} key = {project._id} />
            ))}
        </div>
        <ProjectForm />
      </div>
    )
  }
  
  export default Projects
