const Project = require('../models/projectModel');
const Client = require('../models/userModel');
const mongoose = require('mongoose')

//get all projects
const getProjects = async (req, res) => {
    const user_id = req.user._id
    const projects = await Project.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(projects)
}
// get a single project
const getProject = async (req, res) => {
    const { pid } = req.params;
    try {
        const project = await Project.findOne({ pid: Number(pid) });
        if (!project) {
            return res.status(404).json({ error: 'project not found' });
        }
        res.json(project);
    } catch (error) {
        console.error('Error searching project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
//create a new project
const createProject = async (req, res) => {
    const { pid, title, address, description, phoneNO, user_id } = req.body

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

    try {
        const project = await Project.create({ pid, title, address, description, user_id, phoneNO })
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
//delete a project
const deleteProject = async (req, res) => {
    const { pid } = req.params;

    try {
        const deletedProject = await Project.findOneAndDelete({ pid: pid });
        if (deletedProject) {
            res.status(200).json(deletedProject)
        } else {
            res.status(404).json("Not Found")
        }
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
}
//update a project
const updateProject = async (req, res) => {
    const { pid } = req.params
    const { title, address, description } = req.body

    try {

        const project = await Project.findOneAndUpdate({ pid: pid }, {
            ...req.body
        })

        if (!project) {
            return res.status(400).json({ error: 'Project not found' })
        }

        res.status(200).json(project)

    } catch (e) {
        console.log(e);
    }


}
const countTotal = async (req, res) => {
    try {
        const count = await Project.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).send('Internal Server Error');
    }
};

// ==================================================
const getAllProjects = async (req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 })
    res.status(200).json(projects)
}
// ==================================================

module.exports = {
    getProject,
    getProjects,
    createProject,
    deleteProject,
    updateProject,
    countTotal,
    getAllProjects
}
