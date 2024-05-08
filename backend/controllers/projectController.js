const Project = require('../models/projectModel')
const mongoose = require('mongoose')

//get all projects
const getProjects = async (req, res) => {
    const user_id = req.user._id

    const projects = await Project.find({ user_id }).sort({ createdAt: -1 })

    res.status(200).json(projects)
}

// get a single project
const getProject = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such a project not found' })
    }

    const project = await Project.findById(id)

    if (!project) {
        return res.status(404).json({ error: 'Project not found' })
    }

    res.status(200).json(project)
}

//create a new project
const createProject = async (req, res) => {
    const { pid, title, address, description, phoneNO } = req.body


    let emptyFields = []

    if (!pid) {
        emptyFields.push('pid')
    }
    if (!title) {
        emptyFields.push('title')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!description) {
        emptyFields.push('description')
    }
    if (!phoneNO) {
        emptyFields.push('phoneNO')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        const user_id = req.user._id
        const project = await Project.create({ pid, title, address, description, user_id, phoneNO })
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a project
const deleteProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such a project not found' })
    }

    const project = await Project.findByIdAndDelete({ _id: id })

    if (!project) {
        return res.status(400).json({ error: 'Project not found' })
    }

    res.status(200).json(project)
}

//update a project
const updateProject = async (req, res) => {
    const { id } = req.params
    const { title, address, description } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such a project  found' })
    }

    const project = await Project.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!project) {
        return res.status(400).json({ error: 'Project not found' })
    }

    res.status(200).json(project)
}

const countTotal = async (req, res) => {
    try {
        const count = await Project.countDocuments();
        res.json({count});
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    countTotal
}
