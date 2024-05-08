const express = require('express')
const { getSales,
         getSale,
         createSale,
         deleteSale,
         updateSale,
         countTotal,
        saleSearch
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

//admin page total count
router.get('/total/counts', countTotal)

//search
router.get('/sales/searchId/:id', saleSearch);

module.exports = router
