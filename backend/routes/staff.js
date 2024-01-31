const express = require('express')
const { getStaffs,
         getStaff,
         createStaff,
         deleteStaff,
         updateStaff 
} = require('../controllers/staffController')

const router = express.Router()

//Get all staff members
router.get('/', getStaffs)

//Get a single staff member
router.get('/:id', getStaff)

//Create a new staff member
router.post('/',createStaff)

//Delete a staff member
router.delete('/:id',deleteStaff)

//Update a staff member
router.patch('/:id',updateStaff)



module.exports = router