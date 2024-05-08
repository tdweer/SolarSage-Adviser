const Client = require('../models/clientModel')
const mongoose = require('mongoose')
const SendSMS = require('../controllers/SendSMS')
//get all clients/
const getClients = async (req, res) => {
    //const user_id = req.user._id
    const clients = await Client.find({}).sort({ createdAt: -1 })

    res.status(200).json(clients)
}

// get a single client
const getClient = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such a client  found' })
    }

    const client = await Client.findById(id)

    if (!client) {
        return res.status(404).json({ error: 'Client not found' })
    }

    res.status(200).json(client)
}

//add a new client
const createClient = async (req, res) => {
    const { id, name, address, contact } = req.body

    //add doc to db
    try {
        //const user_id = req.user._id
        const client = await Client.create({ id, name, address, contact })
        SendSMS.sendNotification(contact, `Wellcome to our Company Mr/Mrs ${name} We are happy to have you as our client.[SolarSageAdviser info service]`)
        res.status(200).json(client)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedClient = await Client.findOneAndDelete({ id: id });

        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        SendSMS.sendNotification(deletedClient.contact, `We are sorry to inform you that your account has been deleted from our company.`)

        res.status(200).json({ message: 'Client deleted successfully', deletedClient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}


const updateClient = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedClient = await Client.findOneAndUpdate(
            { id: id },
            req.body,
            { new: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(updatedClient);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const clientSearch = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findOne({ id: Number(id) });
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json(client);
    } catch (error) {
        console.error('Error searching client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const countClients = async (req, res) => {
    try {
        const count = await Client.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching project count:', error);
        res.status(500).send('Internal Server Error');
    }
};






module.exports = {
    getClient,
    getClients,
    createClient,
    deleteClient,
    updateClient,
    countClients,
    clientSearch
}
