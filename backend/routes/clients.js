const express = require('express')
const {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient,
    countClients,
    clientSearch
} = require('../controllers/clientController')
// const  requireAuth  = require('../middleware/requireAuth')


const router = express.Router()


// router.use(requireAuth)

//Get all clients
router.get('/', getClients)

//Get a single client
router.get('/:id', getClient)

//add a new client
router.post('/', createClient)

//Delete a client
router.delete('/delete/:id', deleteClient)

//update a client
router.patch('/update/:id', updateClient)

//totla count admin home
router.get('/total/counts', countClients);

//search
router.get('/client/searchId/:id', clientSearch);


module.exports = router
