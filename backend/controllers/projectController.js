const Project = require('../models/projectsModel')

//get all project
const getProjects = async (req,res) => {
    const getProjects = await projects.find({}).sort({createdAt: -1})
    res.status(200).json(project)
}


//get a single project
const getProject = async (req,res) => {
    const { id } = req.params

    const project = await Project.findById(id)
    if(project) {
        return res.status(404).json({ message: 'Project not found'})
    }

    res.status(200).json(project)
}




//create a new project
const createProject = async (req,res) => {
    const { title, load, reps } = req.body
    //add doc to db
    try{
        const project = await Project.create({title, load, reps})
        res.status(200).json(project)
    }catch(error) {
       res.status(400).json({ error: error.message })
    }
}


//delete a project

//update a project






module.exports = {
    getProject,
    getProjects,
    createProject
}