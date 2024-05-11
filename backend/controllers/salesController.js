const Sales = require('../models/salesModels')
const mongoose = require('mongoose')
const Client = require("../models/clientModel");

//get all sales
const getSales = async (req, res) => {
    // const user_id = req.user._id
    const sales = await Sales.find({}).sort({ createdAt: -1 })

    res.status(200).json(sales)
}

// get a single sale
const getSale = async (req, res) => {
    const { salesid } = req.params;
    try {
        const getSale = await Sales.findOne({ salesid: Number(salesid) });
        if (!getSale) {
            return res.status(404).json({ error: 'sale not found' });
        }
        res.json(getSale);
    } catch (error) {
        console.error('Error searching sale:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//create a new sale
const createSale = async (req, res) => {
    const { salesid, date, clientid, clientname, productinfo, notes, status, amount } = req.body

    let emptyFields = []

    if (!salesid) {
        emptyFields.push('salesid')
    }
    if (!clientid) {
        emptyFields.push('clientid')
    }
    if (!clientname) {
        emptyFields.push('clientname')
    }
    if (!productinfo) {
        emptyFields.push('productinfo')
    }
    if (!notes) {
        emptyFields.push('notes')
    }
    if (!status) {
        emptyFields.push('status')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }


    //add doc to db
    try {
        // const user_id = req.user._id
        const sale = await Sales.create({ salesid, date, clientid, clientname, productinfo, notes, status, amount })
        res.status(200).json(sale)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a sale
const deleteSale = async (req, res) => {
    const { salesid } = req.params;

    try {
        const deleteSale = await Sales.findOneAndDelete({ salesid: salesid });
        if (deleteSale) {
            res.status(200).json(deleteSale)
        } else {
            res.status(404).json("Not Found")
        }
    } catch (error) {
        console.error("Error deleting sales:", error);
        throw error;
    }
}

//update a sale
const updateSale = async (req, res) => {
    const { salesid } = req.params
    try {
        const updateSale = await Sales.findOneAndUpdate({ salesid: salesid }, {
            ...req.body
        })
        if (!updateSale) {
            return res.status(400).json({ error: 'Sales not found' })
        }

        res.status(200).json(updateSale)

    } catch (e) {
        console.log(e);
    }
}

const saleSearch = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await Sales.findOne({ id: Number(id) });
        if (!sale) {
            return res.status(404).json({ error: 'Sales not found' });
        }
        res.json(sale);
    } catch (error) {
        console.error('Error searching Sales:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// const getIncome = async (req, res) => {
//     const sales = await Sales.find({  }).sort({createdAt: -1});
//     let total = 0
//     sales.map(sale => {
//         total += sale.amount
//     })
//     res.status(200).json(total)

// }

const countTotal = async (req, res) => {
    try {
        const count = await Sales.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = {
    getSales,
    getSale,
    createSale,
    deleteSale,
    updateSale,
    countTotal,
    saleSearch
}