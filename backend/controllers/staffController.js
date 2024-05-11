const Staff = require('../models/staffModels')
const mongoose = require('mongoose')

//get all staffs
const getStaffs = async (req, res) => {
    const staffs = await Staff.find({}).sort({ createdAt: -1 })
    res.status(200).json(staffs)
}

// get a single staff  
const getStaff = async (req, res) => {

    const { staffid } = req.params;
    try {
        const staff = await Staff.findOne({ staffid: Number(staffid) });
        if (!staff) {
            return res.status(404).json({ error: 'staff not found' });
        }
        res.json(staff);
    } catch (error) {
        console.error('Error searching staff:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

    // const { id } = req.params
    // // if (!mongoose.Types.ObjectId.isValid(id)) {
    // // return res.status(404).json({ error: 'No such a staff member  found' })
    // // }
    // const staff = await Staff.findById(id)
    // if (!staff) {
    //     return res.status(404).json({ error: 'Staff member not found' })
    // }
    // res.status(200).json(staff)
}

//add a new staff member
const createStaff = async (req, res) => {
    const { staffid, name, address, contact } = req.body

    let emptyFields = []

    if (!staffid) {
        emptyFields.push('staffid')
    }
    if (!name) {
        emptyFields.push('name')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!contact) {
        emptyFields.push('contact')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        const staff = await Staff.create({ staffid, name, address, contact })
        res.status(200).json(staff)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a staff member
const deleteStaff = async (req, res) => {
    const { staffid } = req.params;

    try {
        const deleteStaff = await Staff.findOneAndDelete({ staffid: staffid });
        if (deleteStaff) {
            res.status(200).json(deleteStaff)
        } else {
            res.status(404).json("Not Found")
        }
    } catch (error) {
        console.error("Error deleting staff:", error);
        throw error;
    }
}

//update a staff member
const updateStaff = async (req, res) => {
    const { staffid } = req.params
    const { name, address, contact } = req.body

    try {
        const staff = await Staff.findOneAndUpdate({ staffid: staffid }, {
            ...req.body
        })
        if (!staff) {
            return res.status(400).json({ error: 'staff not found' })
        }
        res.status(200).json(staff)
    } catch (e) {
        console.log(e);
    }
}


//get statff count
const countTotal = async (req, res) => {
    try {
        const count = await Staff.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getStaffs,
    getStaff,
    createStaff,
    deleteStaff,
    updateStaff,
    countTotal
}