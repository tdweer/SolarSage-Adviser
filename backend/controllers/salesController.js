const Sales = require('../models/salesModels')
const mongoose = require('mongoose')

//get all sales
const getSales = async (req, res) => {
    // const user_id = req.user._id
    const sales = await Sales.find({  }).sort({createdAt: -1})

    res.status(200).json(sales)
}

// get a single sale
const getSale = async (req, res) => {
    const  { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a sale not found'})
    }

    const sale = await Sales.findById(id)

    if(!sale){
        return res.status(404).json({error: 'Sale not found'})
    }

    res.status(200).json(sale)
}

//create a new sale
const createSale = async (req, res) => {
    const {salesid, date, clientid, clientname, productinfo, notes, status} = req.body

    let emptyFields = []

    if (!salesid){
        emptyFields.push('salesid')
    }
    if (!date){
        emptyFields.push('date')
    }
    if (!clientid){
        emptyFields.push('clientid')
    }
    if (!clientname){
        emptyFields.push('clientname')
    }
    if (!productinfo){
        emptyFields.push('productinfo')
    }
    if (!notes){
        emptyFields.push('notes')
    }
    if (!status){
        emptyFields.push('status')
    }

    if(emptyFields.length > 0 ){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }


    //add doc to db
    try{
        // const user_id = req.user._id
        const sale = await Sales.create({salesid, date, clientid, clientname, productinfo, notes, status})
        res.status(200).json(sale)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a sale
const deleteSale = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a sale not found'})
    }

    const sale = await Sales.findByIdAndDelete({_id: id})

    if(!sale){
        return res.status(400).json({error: 'Sale not found'})
    }

    res.status(200).json(sale)
}

//update a sale
const updateSale = async (req, res) => {
    const {id} = req.params
    const {date, clientid, clientname, productinfo, notes, status} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a sale not found'})
    }

    const sale = await Sale.findOneAndUpdate({_id: id}, {
        ...req.body})

    if(!sale){
        return res.status(400).json({error: 'Sale not found'})
    }

    res.status(200).json(sale)
}

module.exports = {
    getSales,
    getSale,
    createSale,
    deleteSale,
    updateSale
}