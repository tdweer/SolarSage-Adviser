import * as React from 'react';
import {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/system';
import '../../../assets/theme/AxTheme.css';

function SalesPage() {

    const columns = [
        {field: 'salesId', headerName: 'Sales ID', width: 100},
        {field: 'customerId', headerName: 'Customer ID', width: 150},
        {field: 'customerName', headerName: 'Customer Name', width: 150},
        {field: 'productInfo', headerName: 'Product Info', width: 150},
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


    return (

        <>
            <Box height={100}/>
            <div>

                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <TextField value={saleId} onChange={(event) => {
                        setSaleId(event.target.value)
                    }} id="outlined-basic" label="Sales ID" variant="outlined" size="small" sx={{m: 1}}/>

                    <Button variant="outlined" size="medium"
                        // startIcon={searchIcon()}
                        // onClick={searchEmployee}
                            sx={{height: 40}} className={"btnSearch"}
                    >
                        Search
                    </Button>

                    <TextField value={customerId} onChange={(event) => {
                        setCustomerId(event.target.value)
                    }} id="outlined-basic" label="Customer Id" variant="outlined" size="small" sx={{m: 1}}/>

                    <TextField value={customerName} onChange={(event) => {
                        setCustomerName(event.target.value)
                    }} id="outlined-basic" label="Customer Name" variant="outlined" size="small" sx={{m: 1}}/>

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
                            getRowId={(row) => row.saleId}
                        />
                    </div>
                </Box>


            </div>
        </>
    )
}

export default SalesPage;
