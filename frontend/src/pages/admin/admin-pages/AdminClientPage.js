import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';

function AdminClientPage() {

    const columns = [
        {field: 'id', headerName: 'Client ID', width: 170},
        {field: 'name', headerName: 'Client Name', width: 200},
        {field: 'address', headerName: 'Client Address', width: 200},
        {field: 'contact', headerName: 'Client Contact', width: 200},
    ];

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        fetchClients()
    }, [])

    const fetchClients = async () => {
        const response = await fetch('http://localhost:4000/api/clients')
        const json = await response.json()
        console.log(json)
        setTableData(json);
    }
    const saveClient = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    address: address,
                    contact: contact
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            await fetchClients()
            if (data){
                alert("Client Save Successfully!")
            }else {
                alert("Client Save Unsuccessfully!")
            }
        } catch (error) {
            return { error: 'Failed to save client' };
        }
    }
    const searchClient = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/clients/client/searchId/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            sessionStorage.setItem('_id', data._id);
            setName(data.name);
            setAddress(data.address);
            setContact(data.contact)
        } catch (error) {
            console.error('Error searching client:', error);
            return {error: 'Failed to search client'};
        }
    }
    const deleteClient = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/clients/delete/${id}`, {
                method: 'DELETE'
            });


            console.log(response)

            await fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error.message);
            throw error;
        }
    };
    const updateClient = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/clients/update/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    address: address,
                    contact: contact
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            await fetchClients(); // Refresh the client list
        } catch (error) {
            console.error('Error updating client:', error);
            // Handle error
            return { error: 'Failed to update client' };
        }
    }

    return (

        <>
            <Box height={100}/>
            <div>

                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={id} onChange={(event) => {
                        setID(event.target.value)
                    }} id="outlined-basic" label="Client ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium"
                            onClick={searchClient}
                            sx={{height: 40, mt: 1}} className={"btnSearch"}
                    >
                        Search Client
                    </Button>

                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} id="outlined-basic" label="Client Name" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={address} onChange={(event) => {
                        setAddress(event.target.value)
                    }} id="outlined-basic" label="Client Address" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={contact} onChange={(event) => {
                        setContact(event.target.value)
                    }} id="outlined-basic" label="Client Contact" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}} className={"btnSave"} onClick={saveClient}>
                        Save
                    </Button>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}}
                            onClick={updateClient}
                            className={"btnUpdate"}>
                        Update
                    </Button>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}}
                            className={"btnDelete"} onClick={deleteClient}>
                        Delete
                    </Button>

                </Box>

                <Box component="main" sx={{flex: 1, bgcolor: 'white', p: 1}}>
                    <div style={{height: 450, width: '100%'}}>
                        <DataGrid
                            rows={tableData}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowId={(row) => row.id}
                        />
                    </div>
                </Box>


            </div>
        </>
    )
}

export default AdminClientPage;
