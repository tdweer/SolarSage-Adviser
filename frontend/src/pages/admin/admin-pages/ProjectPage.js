import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';
import {
    deleteProjectAPI,
    getAllProjectAPI,
    saveProjectAPI,
    searchProjectAPI,
    updateProjectAPI
} from "../../../api/rootAPI";

function ProjectPage() {

    const columns = [
        {field: 'pid', headerName: 'Project Id', width: 100},
        {field: 'title', headerName: 'Project Title', width: 150},
        {field: 'phoneNO', headerName: 'Phone Number', width: 150},
        {field: 'address', headerName: 'Address', width: 150},
        {field: 'description', headerName: 'Description', width: 200},
    ];

    const [projectId, setProjectId] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [mobile, setMobile] = useState("");
    const [tableData, setTableData] = useState([]);

    const getAllProjects = async () => {
        const response = await fetch(getAllProjectAPI)
        const json = await response.json();
        setTableData(null);
        setTableData(json);
    }

    useEffect(() => {
        getAllProjects();
    }, []);

    const saveFunction = async () => {

        const userId = localStorage.getItem('USER_ID');

        try {
            const response = await fetch(saveProjectAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: 1,
                    pid: projectId,
                    title: projectTitle,
                    address: address,
                    phoneNO: mobile,
                    description: description
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            await getAllProjects();
            if (data) {
                alert("Project Save Successfully!")
            } else {
                alert("Project Save Unsuccessfully!")
            }
        } catch (error) {
            return {error: 'Failed to save project'};
        }
    }
    const deleteFunction = async () => {
        try {
            const response = await fetch(`${deleteProjectAPI}` + `${projectId}`, {
                method: 'DELETE'
            });
            await getAllProjects();
        } catch (error) {
            console.error('Error deleting client:', error.message);
            throw error;
        }
    };
    const searchFunction = async () => {
        try {
            const response = await fetch(`${searchProjectAPI}` + `${projectId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setProjectTitle(data.title)
            setMobile(data.phoneNO);
            setAddress(data.address);
            setDescription(data.description)
        } catch (error) {
            console.error('Error searching client:', error);
            return {error: 'Failed to search client'};
        }
    }
    const updateFunction = async () => {
        try {

            const userId = localStorage.getItem('USER_ID');

            const response = await fetch(`${updateProjectAPI}` + `${projectId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userId,
                    pid: projectId,
                    title: projectTitle,
                    address: address,
                    phoneNO: mobile,
                    description: description
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            getAllProjects();
        } catch (error) {
            console.error('Error updating client:', error);
            // Handle error
            return {error: 'Failed to update client'};
        }
    }

    return (
        <>
            <Box height={100}/>
            <div>
                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={projectId} onChange={(event) => {
                        setProjectId(event.target.value)
                    }} id="outlined-basic" label="Project ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium" sx={{height: 40}} className={"btnSearch"}
                            onClick={searchFunction}>
                        Search
                    </Button>

                    <TextField value={projectTitle} onChange={(event) => {
                        setProjectTitle(event.target.value)
                    }} id="outlined-basic" label="Project Title" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={address} onChange={(event) => {
                        setAddress(event.target.value)
                    }} id="outlined-basic" label="Address" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={mobile} onChange={(event) => {
                        setMobile(event.target.value)
                    }} id="outlined-basic" label="Mobile" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }} id="outlined-basic" label="Description" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}} className={"btnSave"}
                            onClick={saveFunction}>
                        Save
                    </Button>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}}
                            className={"btnUpdate"} onClick={updateFunction}>
                        Update
                    </Button>

                    <Button variant="outlined" size="medium" color='info' sx={{m: 1, width: 100}}
                            className={"btnDelete"}
                            onClick={deleteFunction}>
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
                            getRowId={(row) => row.pid}
                        />
                    </div>
                </Box>
            </div>
        </>
    )
}

export default ProjectPage;
