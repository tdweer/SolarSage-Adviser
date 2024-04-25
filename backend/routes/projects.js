const express =  require('express')
const { createProject,
        getProjects,
        getProject,
        deleteProject,
        updateProject
 } = require('../controllers/projectController')
const  requireAuth  = require('../middleware/requireAuth')


const router = express.Router()

// router.use(requireAuth)

//Get all projects
router.get('/', requireAuth ,getProjects)

//Get a single project
router.get('/:id',requireAuth , getProject)

//Create a new project
router.post('/',requireAuth ,createProject)
    

//Delete a project
router.delete('/:id',requireAuth, deleteProject)


//Update a project
router.patch('/:id',requireAuth ,updateProject)




module.exports = router