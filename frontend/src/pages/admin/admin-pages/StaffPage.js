import * as React from 'react';
import {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';

function StaffPage() {

    const columns = [
        {field: 'clientId', headerName: 'StaffID', width: 100},
        {field: 'name', headerName: 'Staff Name', width: 150},
        {field: 'address', headerName: 'Staff Address', width: 150},
        {field: 'contact', headerName: 'Staff Contact', width: 200},
    ];

    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [tableData, setTableData] = useState([]);

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
                        // onClick={searchEmployee}
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
                            sx={{m: 1, width: 100}} className={"btnSave"}>
                        Save
                    </Button>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}}
                            className={"btnUpdate"}>
                        Update
                    </Button>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}}
                            className={"btnDelete"}>
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

export default StaffPage;
