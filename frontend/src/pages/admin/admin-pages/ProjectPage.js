import * as React from 'react';
import {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';

function ProjectPage() {

    const columns = [
        {field: 'projectId', headerName: 'Project Id', width: 100},
        {field: 'projectTitle', headerName: 'Project Title', width: 150},
        {field: 'address', headerName: 'Address', width: 150},
        {field: 'description', headerName: 'Description', width: 200},
    ];

    const [projectId, setProjectId] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [tableData, setTableData] = useState([]);

    return (

        <>
            <Box height={100}/>
            <div>

                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={projectId} onChange={(event) => {
                        setProjectId(event.target.value)
                    }} id="outlined-basic" label="Project ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium"
                            sx={{height: 40}} className={"btnSearch"}
                    >
                        Search
                    </Button>

                    <TextField value={projectTitle} onChange={(event) => {
                        setProjectTitle(event.target.value)
                    }} id="outlined-basic" label="Project Title" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={address} onChange={(event) => {
                        setAddress(event.target.value)
                    }} id="outlined-basic" label="Address" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} id="outlined-basic" label="Description" variant="outlined" size="small" sx={{m: 1}}/>

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
                            getRowId={(row) => row.projectId}
                        />
                    </div>
                </Box>


            </div>
        </>
    )
}

export default ProjectPage;
