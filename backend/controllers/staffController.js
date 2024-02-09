const Staff = require('../models/staffModels')
const mongoose = require('mongoose')

//get all staffs
const getStaffs = async (req, res) => {
    const staffs = await Staff.find({}).sort({createdAt: -1})

    res.status(200).json(staffs)
}

// get a single staff  
const getStaff = async (req, res) => {
    const  { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a staff member  found'})
    }

    const staff = await Staff.findById(id)

    if(!staff){
        return res.status(404).json({error: 'Staff member not found'})
    }

    res.status(200).json(staff)
}

//add a new staff member
const createStaff = async (req, res) => {
    const {staffid, name, address, contact} = req.body

    let emptyFields = []

    if (!staffid){
        emptyFields.push('staffid')
    }
    if (!name){
        emptyFields.push('name')
    }
    if (!address){
        emptyFields.push('address')
    }
    if (!contact){
        emptyFields.push('contact')
    }
   
    if(emptyFields.length > 0 ){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }




    //add doc to db
    try{
        const staff = await Staff.create({staffid, name, address, contact})
        res.status(200).json(staff)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a staff member
const deleteStaff = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a staff  member found'})
    }

    const staff = await Staff.findByIdAndDelete({_id: id})

    if(!staff){
        return res.status(400).json({error: 'Staff member not found'})
    }

    res.status(200).json(staff)
}

//update a staff member
const updateStaff = async (req, res) => {
    const {id} = req.params
    const {name, address, contact} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such a staff member found'})
    }

    const staff = await Staff.findOneAndUpdate({_id: id}, {
        ...req.body})

    if(!staff){
        return res.status(400).json({error: 'Staff member not found'})
    }

    res.status(200).json(staff)
}

module.exports = {
    getStaffs,
    getStaff,
    createStaff,
    deleteStaff,
    updateStaff
}