import { useEffect, } from "react"
import { useProjectsContext } from "../hooks/useProjectsContext"
// components
import ProjectsDetails from "../Components/ProjectsDetails"
import ProjectForm from "../Components/ProjectForm"

const Home = () => {
  const [project, dispatch] = useProjectsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/projects')
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_PROJECTS', payload: json })
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="projects">
        {project && project.map(project => (
          <ProjectsDetails project={project} key={project._id} />
        ))}
      </div>
      <ProjectForm />
    </div>
  )
}

export default Home