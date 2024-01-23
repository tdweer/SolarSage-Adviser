const Project = require('../models/projectsModel')
const mongoose = require('mongoose')

//get all project
const getProjects = async (req, res) => {
    const projects = await Project.find({}).sort({createdAt: -1})

    res.status(200).json(projects)
}


//get a single project
const getProject = async (req, res) => {
    const { id } = req.params

if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'no such project'})
}

    const project = await Project.findById(id)

    if(!project) {
        return res.status(404).json({error: 'Project not found'})
    }

    res.status(200).json(project)
}




//create a new project
const createProject = async (req, res) => {
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
const deleteProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such project'})
    }

    const project = await Project.findOneAndDelete({_id: id})

    if(!project) {
        return res.status(404).json({error: 'Project not found'})
    }

    res.status(200).json(project)
}


//update a project
const updateProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such project'})
    }

    const project = await Project.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!project) {
        return res.status(404).json({error: 'Project not found'})
    }

    res.status(200).json(project)
}
 




module.exports = {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProject
}