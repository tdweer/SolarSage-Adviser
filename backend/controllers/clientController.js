const Client = require('../models/clientModel')
const mongoose = require('mongoose')

//get all clients
const getClients = async (req, res) => {
    //const user_id = req.user._id
    const clients = await Client.find({  }).sort({createdAt: -1})

    res.status(200).json(clients)
}

// get a single client
const getClient = async (req, res) => {
    const  { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a client  found'})
    }

    const client = await Client.findById(id)

    if(!client){
        return res.status(404).json({error: 'Client not found'})
    }

    res.status(200).json(client)
}

//add a new client	
const createClient = async (req, res) => {
    const {id, name, address, contact} = req.body

    //add doc to db
    try{
        //const user_id = req.user._id
        const client = await Client.create({id, name, address, contact})
        res.status(200).json(client)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a client
const deleteClient = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a client  found'})
    }

    const client = await Client.findByIdAndDelete({_id: id})

    if(!client){
        return res.status(400).json({error: 'Client not found'})
    }

    res.status(200).json(client)
}

//update a client  
const updateClient = async (req, res) => {
    const {id} = req.params
    const {name, address, contact} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a client  found'})
    }

    const client = await Client.findOneAndUpdate({_id: id}, {
        ...req.body})
    if(!client){
        return res.status(400).json({error: 'Client not found'})
    }

    res.status(200).json(client)
}

module.exports = {
    getClient,
    getClients,
    createClient,
    deleteClient,
    updateClient
}
