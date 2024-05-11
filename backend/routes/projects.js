const express = require('express')
const { createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject,
    countTotal,
    getAllProjects
} = require('../controllers/projectController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//Get all projects
router.get('/', requireAuth, getProjects)

//Get a single project
// router.get('/:id', requireAuth, getProject)
router.get('/:pid', getProject)

//Create a new project
// router.post('/',requireAuth ,createProject)
router.post('/', createProject)

//Delete a project
// router.delete('/:id', requireAuth, deleteProject)
router.delete('/:pid', deleteProject)

//Update a project
router.patch('/:pid', updateProject)

//dashboard get count
router.get('/total/counts', countTotal)

router.get('/getAll/projects', getAllProjects)

module.exports = router
