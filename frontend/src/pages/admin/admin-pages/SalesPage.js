import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';
import {
   
    deleteSalesAPI,
    getAllSalesAPI,
    saveSalesAPI,
    searchSalesAPI,
    updateSalesAPI
} from "../../../api/rootAPI";

function SalesPage() {

    const columns = [
        {field: 'salesid', headerName: 'Sales ID', width: 100},
        {field: 'date', headerName: 'Date', width: 200},
        {field: 'clientid', headerName: 'Client Id', width: 150},
        {field: 'clientname', headerName: 'Client Name', width: 150},
        {field: 'productinfo', headerName: 'Product Info', width: 150},
        {field: 'notes', headerName: 'Notes', width: 200},
        {field: 'status', headerName: 'Status', width: 200},
        {field: 'amount', headerName: 'Amount', width: 200},
    ];

    const [saleId, setSaleId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [productInfo, setProductInfo] = useState("");
    const [notes, setNotes] = useState("");
    const [status, setStatus] = useState("");
    const [amount, setAmount] = useState("");
    const [tableData, setTableData] = useState([]);

    const getAllSales = async () => {
        const response = await fetch(getAllSalesAPI)
        const json = await response.json();
        setTableData(null);
        setTableData(json);
    }

    useEffect(() => {
        getAllSales();
    }, []);

    const saveFunction = async () => {

        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}`;

        try {
            const response = await fetch(saveSalesAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    salesid: saleId,
                    date: formattedDate,
                    clientid: customerId,
                    clientname: customerName,
                    productinfo: productInfo,
                    notes: notes,
                    status: status,
                    amount: amount
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            await getAllSales();
            if (data) {
                alert("Sales Save Successfully!")
            } else {
                alert("Sales Save Unsuccessfully!")
            }
        } catch (error) {
            return {error: 'Failed to save Sales'};
        }
    }
    const searchFunction = async () => {
        try {
            const response = await fetch(`${searchSalesAPI}` + `${saleId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setCustomerId(data.clientid)
            setCustomerName(data.clientname);
            setAmount(data.amount);
            setNotes(data.notes)
            setProductInfo(data.productinfo)
            setStatus(data.status)
        } catch (error) {
            console.error('Error searching sale:', error);
            return {error: 'Failed to search sale'};
        }
    }
    const updateFunction = async () => {
        try {

            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}`;

            const response = await fetch(`${updateSalesAPI}` + `${saleId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    salesid: saleId,
                    date: formattedDate,
                    clientid: customerId,
                    clientname: customerName,
                    productinfo: productInfo,
                    notes: notes,
                    status: status,
                    amount: amount
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            getAllSales();
        } catch (error) {
            console.error('Error updating sales:', error);
            return {error: 'Failed to update sales'};
        }
    }
    const deleteFunction = async () => {
        try {
            const response = await fetch(`${deleteSalesAPI}` + `${saleId}`, {
                method: 'DELETE'
            });
            await getAllSales();
        } catch (error) {
            console.error('Error deleting sales:', error.message);
            throw error;
        }
    };


    return (

        <>
            <Box height={100}/>
            <div>

                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={saleId} onChange={(event) => {
                        setSaleId(event.target.value)
                    }} id="outlined-basic" label="Sales ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium"
                            onClick={searchFunction}
                            sx={{height: 40}} className={"btnSearch"}
                    >
                        Search
                    </Button>

                    <TextField value={customerId} onChange={(event) => {
                        setCustomerId(event.target.value)
                    }} id="outlined-basic" label="Client Id" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={customerName} onChange={(event) => {
                        setCustomerName(event.target.value)
                    }} id="outlined-basic" label="Client Name" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={productInfo} onChange={(event) => {
                        setProductInfo(event.target.value)
                    }} id="outlined-basic" label="Product Info" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={notes} onChange={(event) => {
                        setNotes(event.target.value)
                    }} id="outlined-basic" label="Notes" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={status} onChange={(event) => {
                        setStatus(event.target.value)
                    }} id="outlined-basic" label="Status" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={amount} onChange={(event) => {
                        setAmount(event.target.value)
                    }} id="outlined-basic" label="Amount" variant="outlined" size="small" sx={{m: 1}}/>


                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}} className={"btnSave"} onClick={saveFunction}>
                        Save
                    </Button>

                    <Button variant="outlined" size="medium" color='info'
                            sx={{m: 1, width: 100}}
                            className={"btnUpdate"}
                            onClick={updateFunction}>
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
                            getRowId={(row) => row.salesid}
                        />
                    </div>
                </Box>
            </div>
        </>
    )
}

export default SalesPage;
