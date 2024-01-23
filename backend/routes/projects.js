const express = require('express')
const{
    createProject,
    getProject,
    getProjects,
}= require('../controllers/projectController')
const Project = require('../models/projectsModel')
const router = express.Router()

//get all projects
router.get('/', getProjects)

//get one project
router.get('/:id', getProject)

//post a new project
router.post('/', createProject)

//delete a project
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete a project '})
})

//update a project
router.patch('/:id', (req, res) => {
    res.json({ message: 'Update a project '})
})

module.exports = router