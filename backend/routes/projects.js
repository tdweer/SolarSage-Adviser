const express = require('express')
const{
    createProject,
    getProject,
    getProjects,
    deleteProject,
    updateProject
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
router.delete('/:id', deleteProject)

//update a project
router.patch('/:id', updateProject)

module.exports = router