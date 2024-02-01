import { useEffect } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"

//components
import ProjectDetails from "../Components/ProjectDetails"
import ProjectForm from "../Components/ProjectForm"


const Home = () => {
    // const [projects, setProjects] = useState(null)
    const  { projects, dispatch } = useProjectsContext()

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/projects')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_PROJECTS', payload: json})
            }
        }


        fetchProjects()
    }, [dispatch])


    return (
      <div className="home">
        <div className="projects">
            {projects && projects.map((project) => (
                <ProjectDetails project = {project} key = {project._id} />
            ))}
        </div>
        <ProjectForm />
      </div>
    )
  }
  
  export default Home