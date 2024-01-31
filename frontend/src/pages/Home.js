import { useEffect, useState } from "react"

//components
import ProjectDetails from "../Components/ProjectDetails"
import ProjectForm from "../Components/ProjectForm"


const Home = () => {
    const [projects, setProjects] = useState(null)

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch('/api/projects')
            const json = await response.json()

            if (response.ok) {
                setProjects(json)
            }
        }


        fetchProjects()
    }, [])


    return (
      <div className="home">
        <div className="projects">
            {projects && projects.map((project) => (
                <ProjectDetails key={project.id} project={project} />
            ))}
        </div>
        <ProjectForm />
      </div>
    )
  }
  
  export default Home