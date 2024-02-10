const express =  require('express')
const { createProject,
        getProjects,
        getProject,
        deleteProject,
        updateProject
 } = require('../controllers/projectController')
const  requireAuth  = require('../middleware/requireAuth')


const router = express.Router()

router.use(requireAuth)

//Get all projects
router.get('/', getProjects)

//Get a single project
router.get('/:id', getProject)

//Create a new project
router.post('/',createProject)
    

//Delete a project
router.delete('/:id',deleteProject)


//Update a project
router.patch('/:id',updateProject)




module.exports = router