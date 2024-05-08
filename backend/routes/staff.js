const express = require('express')
const { getStaffs,
         getStaff,
         createStaff,
         deleteStaff,
         updateStaff,
         countTotal 
} = require('../controllers/staffController')
// const  requireAuth  = require('../middleware/requireAuth')


const router = express.Router()
// router.use(requireAuth)

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


router.get('/total/counts',countTotal)

module.exports = router