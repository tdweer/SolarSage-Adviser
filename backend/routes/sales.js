const express = require('express')
const { getSales,
         getSale,
         createSale,
         deleteSale,
         updateSale,
         countTotal 
} = require('../controllers/salesController')
// const  requireAuth  = require('../middleware/requireAuth')


const router = express.Router()
// router.use(requireAuth)

//Get all sales
router.get('/', getSales)

//Get a single sale
router.get('/:id', getSale)

//Create a new sale
router.post('/',createSale)

//Delete a sale
router.delete('/:id',deleteSale)    

//Update a sale
router.patch('/:id',updateSale)

router.get('/total/counts', countTotal)



module.exports = router
