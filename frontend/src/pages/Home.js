import { useEffect, useState } from "react"

// components
import ProjectsDetails from "../Components/ProjectsDetails"

const Home = () => {
  const [project, setProjects] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/projects')
      const json = await response.json()

      if (response.ok) {
        setProjects(json)
      }
    }

    fetchWorkouts()
  }, [])

  return (
    <div className="home">
      <div className="workouts">
        {project && project.map(project => (
          <ProjectsDetails project={project} key={project._id} />
        ))}
      </div>
    </div>
  )
}

export default Home