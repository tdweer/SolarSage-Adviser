import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';
import {deleteStaffAPI, getAllStaffAPI, saveStaffAPI, searchStaffAPI, updateStaffAPI} from "../../../api/rootAPI";

function StaffPage() {

    const columns = [
        {field: 'staffid', headerName: 'StaffID', width: 100},
        {field: 'name', headerName: 'Staff Name', width: 150},
        {field: 'address', headerName: 'Staff Address', width: 150},
        {field: 'contact', headerName: 'Staff Contact', width: 200},
    ];

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [tableData, setTableData] = useState([]);

    const getAllStaff = async () => {
        const response = await fetch(getAllStaffAPI)
        const json = await response.json();
        setTableData(null);
        setTableData(json);
    }
    useEffect(() => {
        getAllStaff();
    }, []);
    const saveFunction = async () => {

        try {
            const response = await fetch(saveStaffAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    staffid: id,
                    name: name,
                    address: address,
                    contact: Number(contact)
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            await getAllStaff();
            if (data) {
                alert("Staff Save Successfully!")
            } else {
                alert("Staff Save Unsuccessfully!")
            }
        } catch (error) {
            return {error: 'Failed to save project'};
        }
    }
    const searchFunction = async () => {
        try {
            const response = await fetch(`${searchStaffAPI}` + `${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setContact(data.contact);
            setAddress(data.address);
            setName(data.name)
        } catch (error) {
            console.error('Error searching Staff:', error);
            return {error: 'Failed to search Staff'};
        }
    }
    const updateFunction = async () => {
        try {
            const response = await fetch(`${updateStaffAPI}` + `${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    staffid: id,
                    name: name,
                    address: address,
                    contact: contact,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            getAllStaff();
        } catch (error) {
            console.error('Error updating staff:', error);
            // Handle error
            return {error: 'Failed to update staff'};
        }
    }
    const deleteFunction = async () => {
        try {
            const response = await fetch(`${deleteStaffAPI}` + `${id}`, {
                method: 'DELETE'
            });
            await getAllStaff();
        } catch (error) {
            console.error('Error deleting staff:', error.message);
            throw error;
        }
    };


    return (

        <>
            <Box height={100}/>
            <div>

                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={id} onChange={(event) => {
                        setID(event.target.value)
                    }} id="outlined-basic" label="Staff ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium"
                        // startIcon={searchIcon()}
                            onClick={searchFunction}
                            sx={{height: 40}} className={"btnSearch"}
                    >
                        Search
                    </Button>

                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} id="outlined-basic" label="Staff Name" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={address} onChange={(event) => {
                        setAddress(event.target.value)
                    }} id="outlined-basic" label="Staff Address" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={contact} onChange={(event) => {
                        setContact(event.target.value)
                    }} id="outlined-basic" label="Staff Contact" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}} className={"btnSave"}
                            onClick={saveFunction}>
                        Save
                    </Button>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}}
                            onClick={updateFunction}
                            className={"btnUpdate"}>
                        Update
                    </Button>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}}
                            className={"btnDelete"}
                            onClick={deleteFunction}
                    >
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
                            getRowId={(row) => row.staffid}
                        />
                    </div>
                </Box>
            </div>
        </>
    )
}

export default StaffPage;
