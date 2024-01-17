const express = require('express')
const Project = require('../models/projectsModel')
const router = express.Router()

//get all projects
router.get('/', (req, res) => {
    res.json({ message: 'Get all projects '})
})

//get one project
router.get('/:id', (req, res) => {
    res.json({ message: 'Get one project '})
})

//post a new project
router.post('/', async (req, res) => {
    const { title, load, reps } = req.body

    try{
        const project = await Project.create({title, load, reps})
        res.status(200).json(project)
    }catch(error) {
       res.status(400).json({ error: error.message })
    }
})

//delete a project
router.delete('/:id', (req, res) => {
    res.json({ message: 'Delete a project '})
})

//update a project
router.patch('/:id', (req, res) => {
    res.json({ message: 'Update a project '})
})

module.exports = router