import { useAuthContext } from "../hooks/useAuthContext"


//components
import ProjectDetails from "../Components/ProjectDetails"
import ProjectForm from "../Components/ProjectForm"
import SideTab from "../Components/SideTab"


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayProject = ({ projectData , user}) => {
  // const [projects, setProjects] = useState([]);
  // setProjects(projectData);
  // console.log(user);
  // Fetch projects and their associated user data
  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const users = await Promise.all(
  //         projectData.map(project =>
  //           axios.get(`http://localhost:4000/api/users/${project.user_id}`).then(res => ({ ...project, username: res.data.username }))
  //         )
  //       );
  //       setProjects(users);
  //     } catch (error) {
  //       console.error('Failed to fetch projects', error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  // Function to handle project deletion
  console.log(projectData);
  const handleDelete = async (pid) => {
    try {
      await axios.delete(`/api/projects/${pid}` , {
        headers: {
          'Authorization': `Bearer ${user.token}`
       }
      });
      // setProjects(prev => prev.filter(project => project.pid !== pid));
      alert('Project deleted successfully!');
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Project Details</h1>
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope='col' className='px-6 py-3'>Project ID</th>
            <th scope='col' className='px-6 py-3'>Title</th>
            <th scope='col' className='px-6 py-3'>Address</th>
            <th scope='col' className='px-6 py-3'>Description</th>
            <th scope='col' className='px-6 py-3'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map(project => (
            <tr key={project.pid} className='bg-white border-b'>
              <td className='px-6 py-4'>{project.pid}</td>
              <td className='px-6 py-4'>{project.title}</td>
              <td className='px-6 py-4'>{project.address}</td>
              <td className='px-6 py-4'>{project.description}</td>
              <td className='px-6 py-4'>
                <button onClick={() => handleDelete(project.pid)} className='text-red-500 hover:text-red-700'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const Projects = () => {

    const { user } = useAuthContext()
    const [project , setProject] = useState([]);
    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get('http://localhost:4000/api/projects/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                 }
             })
            // const json = await response.json()
            //  setProject(response?.data);
            //  console.log(response.data)
            setProject(response?.data);
            // if (response.ok) {
            //   setProject(response?.data);
            // }
             console.log(project)
        }

         if (user){
        fetchProjects()
        }
    // }, [dispatch])
     }, [user])
    


    return (
      <div className="flex flex-row">
       <div className="flex-none">
        <SideTab/>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-center m-4">Wellcome to Projects</h1>
        <div className="grid grid-cols-2 mx-5 place-content-center w-2/3">
          <ProjectForm />
          <DisplayProject projectData={project} />
        </div>
        
        
      </div>
      </div>
    )
  }
  
  export default Projects