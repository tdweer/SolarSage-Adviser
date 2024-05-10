import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { predictAPI, recommendAPI } from "../../../api/rootAPI";

const systemTypes = [
    { id: 1, label: "On Grid" },
    { id: 2, label: "Off Grid" },
    { id: 3, label: "Hybrid" },
];

const ElectricityUsage = [
    { id: 1, label: "0-120" },
    { id: 2, label: "121-240" },
    { id: 3, label: "241-420" },
    { id: 4, label: "421-480" },
    { id: 5, label: "481-600" },
    { id: 6, label: "601-900" },
    { id: 7, label: "901-960" },
    { id: 8, label: "961-1200" },
    { id: 9, label: "1201-1800" },
    { id: 10, label: "1801-2400" },
    { id: 11, label: "2401-3600" },
    { id: 12, label: "3601-4800" },
    { id: 13, label: "4801-6000" },
    { id: 14, label: "6001-7200" },
];

const solarPanels = [
    { id: 1, label: "JA Solar" },
    { id: 2, label: "Jinko" },
    { id: 3, label: "Canada Solar" },
    { id: 4, label: "Panasonic" },
];

const inverters = [
    { id: 1, label: "Godwee China" },
    { id: 2, label: "SMA Germany" },
    { id: 3, label: "Canadian Solar" },
    { id: 4, label: "Grawatt China" },
];

const batteries = [
    { id: 1, label: "No Battery" },
    { id: 2, label: "LFP Lithium" },
    { id: 3, label: "Lead Acid" },
];

const systemSizes = [
    { id: 1, label: "1 kW" },
    { id: 2, label: "2 kW" },
    { id: 3, label: "3.5 kW" },
    { id: 4, label: "4 kW" },
    { id: 5, label: "5 kW" },
    { id: 6, label: "7.5 kW" },
    { id: 7, label: "8 kW" },
    { id: 8, label: "10 kW" },
    { id: 9, label: "15 kW" },
    { id: 10, label: "20 kW" },
    { id: 11, label: "30 kW" },
    { id: 12, label: "40 kW" },
    { id: 13, label: "50 kW" },
    { id: 14, label: "60 kW" },
];

const Adviser = () => {
    const [inputData, setInputData] = useState({});
    const [inputDataRec, setInputDataRec] = useState({});
    const [recommendationInput, setRecommendationInput] = useState("");
    const [recommandData, setRecommandData] = useState([]);
    const [recommendedSystem, setRecommendedSystem] = useState(null);
    const [predictedCost, setPredictedCost] = useState(null);
    const [email, setEmail] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputChangeRec = (e) => {
        const { name, value } = e.target;
        setInputDataRec((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleRecommendationInputChange = (e) => {
        setRecommendationInput(e.target.value);
    };

    const handleRecommendation = async (e) => {
        e.preventDefault();
        try {
            const textData = `${inputDataRec.ElectricityUsage} ${inputDataRec.SystemTypeID} ${inputDataRec.SolarPanelID} ${inputDataRec.InverterID} ${inputDataRec.BatteryID}`;
            console.log(textData);
            const response = await axios.post(recommendAPI, {
                input_text: textData,
            });
            setRecommendedSystem(response.data);
            setRecommandData(response.data?.recommendations);
            console.log(recommandData);
        } catch (error) {
            console.error("Error getting recommendation:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(predictAPI, inputData);
            setPredictedCost(response.data.predicted_cost);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
        try {
            const mailData = {
                email,
                value: predictedCost,
                addData: inputData,
            };
            const response = await axios.post(
                "http://localhost:4000/api/email/sendmail",
                mailData
            );
            if (response) {
                console.log("yes", response);
            } else {
                console.log("no", response);
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Error in sending email");
        }
    };

    const handleSelectRecommended = () => {
        setInputData(recommendedSystem);
    };

    return (
        <>
            <Box height={100} />
            <div>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: "white", p: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Recommendation System
                </Typography>
                <form onSubmit={handleRecommendation}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="electricity-usage-label">Electricity Usage Size</InputLabel>
                        <Select
                            labelId="electricity-usage-label"
                            id="ElectricityUsage"
                            name="ElectricityUsage"
                            value={inputDataRec.ElectricityUsage || ""}
                            onChange={handleInputChangeRec}
                            required
                        >
                            <MenuItem value="">Select System Size</MenuItem>
                            {ElectricityUsage.map((size) => (
                                <MenuItem key={size.id} value={size.label}>
                                    {size.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="system-type-label">System Type</InputLabel>
                        <Select
                            labelId="system-type-label"
                            id="SystemTypeID"
                            name="SystemTypeID"
                            value={inputDataRec.SystemTypeID || ""}
                            onChange={handleInputChangeRec}
                            required
                        >
                            <MenuItem value="">Select System Type</MenuItem>
                            {systemTypes.map((type) => (
                                <MenuItem key={type.id} value={type.label}>
                                    {type.label}
                                </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="solar-panel-label">Solar Panel</InputLabel>
                                <Select
                                    labelId="solar-panel-label"
                                    id="SolarPanelID"
                                    name="SolarPanelID"
                                    value={inputDataRec.SolarPanelID || ""}
                                    onChange={handleInputChangeRec}
                                    required
                                >
                                    <MenuItem value="">Select Solar Panel</MenuItem>
                                    {solarPanels.map((panel) => (
                                        <MenuItem key={panel.id} value={panel.label}>
                                            {panel.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="inverter-label">Inverter</InputLabel>
                                <Select
                                    labelId="inverter-label"
                                    id="InverterID"
                                    name="InverterID"
                                    value={inputDataRec.InverterID || ""}
                                    onChange={handleInputChangeRec}
                                    required
                                >
                                    <MenuItem value="">Select Inverter</MenuItem>
                                    {inverters.map((inverter) => (
                                        <MenuItem key={inverter.id} value={inverter.label}>
                                            {inverter.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="battery-label">Battery</InputLabel>
                                <Select
                                    labelId="battery-label"
                                    id="BatteryID"
                                    name="BatteryID"
                                    value={inputDataRec.BatteryID || ""}
                                    onChange={handleInputChangeRec}
                                    required
                                >
                                    <MenuItem value="">Select Battery</MenuItem>
                                    {batteries.map((battery) => (
                                        <MenuItem key={battery.id} value={battery.label}>
                                            {battery.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                variant="outlined" size="medium"
                            sx={{height: 40, mt: 1}}
                                className={"btnSearch"}>
                                Get Recommendation
                            </Button>
                        </form>
         
                        <Typography variant="body1">
                            {recommandData && recommandData.map((data) => <div>{data}</div>)}
                        </Typography>
         
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h6" gutterBottom>
                                System Configuration
                            </Typography>
                            <Box display="flex" flexWrap="wrap">
                                <FormControl margin="normal" sx={{ minWidth: 200 }}>
                                    <InputLabel id="system-size-label">System Size</InputLabel>
                                    <Select
                                        labelId="system-size-label"
                                        id="SystemSizeID"
                                        name="SystemSizeID"
                                        value={inputData.SystemSizeID || ""}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Select System Size</MenuItem>
                                        {systemSizes.map((size) => (
                                            <MenuItem key={size.id} value={size.id}>
                                                {size.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" sx={{ minWidth: 200 }}>
                                    <InputLabel id="system-type-label">System Type</InputLabel>
                                    <Select
                                        labelId="system-type-label"
                                        id="SystemTypeID"
                                        name="SystemTypeID"
                                        value={inputData.SystemTypeID || ""}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Select System Type</MenuItem>
                                        {systemTypes.map((type) => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" sx={{ minWidth: 200 }}>
                                    <InputLabel id="solar-panel-label">Solar Panel</InputLabel>
                                    <Select
                                        labelId="solar-panel-label"
                                        id="SolarPanelID"
                                        name="SolarPanelID"
                                        value={inputData.SolarPanelID || ""}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Select Solar Panel</MenuItem>
                                        {solarPanels.map((panel) => (
                                            <MenuItem key={panel.id} value={panel.id}>
                                                {panel.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" sx={{ minWidth: 200 }}>
                                    <InputLabel id="inverter-label">Inverter</InputLabel>
                                    <Select
                                        labelId="inverter-label"
                                        id="InverterID"
                                        name="InverterID"
                                        value={inputData.InverterID || ""}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Select Inverter</MenuItem>
                                        {inverters.map((inverter) => (
                                            <MenuItem key={inverter.id} value={inverter.id}>
                                                {inverter.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" sx={{ minWidth: 200 }}>
                                    <InputLabel id="battery-label">Battery</InputLabel>
                                    <Select
                                        labelId="battery-label"
                                        id="BatteryID"
                                        name="BatteryID"
                                        value={inputData.BatteryID || ""}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <MenuItem value="">Select Battery</MenuItem>
                                        {batteries.map((battery) => (
                                            <MenuItem key={battery.id} value={battery.id}>
                                                {battery.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                type="submit"
                                variant="outlined" size="medium"
                            sx={{height: 40, mt: 1}}
                                className={"btnSearch"}
                            >
                                Predict Cost
                            </Button>
                        </form>
         
                        {predictedCost && (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    Predicted Cost: Rs. {predictedCost}
                                </Typography>
                                <form onSubmit={handleSendEmail}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        margin="normal"
                                        fullWidth
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="outlined" size="medium" color='info'
                                        sx={{height: 40, mt: 1}} className={"btnSave"}
                                    >
                                        Send Email
                                    </Button>
                                </form>
                            </>
                        )}
                    </Box>
                </div>
                </>
            );
         };
         
         export default Adviser;