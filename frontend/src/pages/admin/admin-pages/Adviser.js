import React, {useState} from "react";
import axios from "axios";
import {Box} from "@mui/system";
import {predictAPI, recommendAPI} from "../../../api/rootAPI";

const systemTypes = [
    {id: 1, label: "On Grid"},
    {id: 2, label: "Off Grid"},
    {id: 3, label: "Hybrid"},
];

const ElectricityUsage = [
    {id: 1, label: "0-120"},
    {id: 2, label: "121-240"},
    {id: 3, label: "241-420"},
    {id: 4, label: "421-480"},
    {id: 5, label: "481-600"},
    {id: 6, label: "601-900"},
    {id: 7, label: "901-960"},
    {id: 8, label: "961-1200"},
    {id: 9, label: "1201-1800"},
    {id: 10, label: "1801-2400"},
    {id: 11, label: "2401-3600"},
    {id: 12, label: "3601-4800"},
    {id: 13, label: "4801-6000"},
    {id: 14, label: "6001-7200"},

];
const solarPanels = [
    {id: 1, label: "JA Solar"},
    {id: 2, label: "Jinko"},
    {id: 3, label: "Canada Solar"},
    {id: 4, label: "Panasonic"},
];

const inverters = [
    {id: 1, label: "Godwee China"},
    {id: 2, label: "SMA Germany"},
    {id: 3, label: "Canadian Solar"},
    {id: 4, label: "Grawatt China"},
];

const batteries = [
    {id: 1, label: "No Battery"},
    {id: 2, label: "LFP Lithium"},
    {id: 3, label: "Lead Acid"},
];

const systemSizes = [
    {id: 1, label: "1 kW"},
    {id: 2, label: "2 kW"},
    {id: 3, label: "3.5 kW"},
    {id: 4, label: "4 kW"},
    {id: 5, label: "5 kW"},
    {id: 6, label: "7.5 kW"},
    {id: 7, label: "8 kW"},
    {id: 8, label: "10 kW"},
    {id: 9, label: "15 kW"},
    {id: 10, label: "20 kW"},
    {id: 11, label: "30 kW"},
    {id: 12, label: "40 kW"},
    {id: 13, label: "50 kW"},
    {id: 14, label: "60 kW"},
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
        const {name, value} = e.target;
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleInputChangeRec = (e) => {
        const {name, value} = e.target;
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
            const response = await axios.post(
                predictAPI,
                inputData
            );
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
                addData: inputData
            };
            const response = await axios.post(
                "http://localhost:4000/api/email/sendmail",
                mailData
            );
            if (response) {
                console.log("yes", response)
            }else {
                console.log("no", response)
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert('error in send email')
        }
    };

    const handleSelectRecommended = () => {
        setInputData(recommendedSystem);
    };

    return (

        <>
            <Box height={100}/>
            <div>
                <Box component="main" sx={{flexGrow: 1, bgcolor: 'white', p: 1}}>

                    <label htmlFor="recommendationInput" className="block font-medium text-gray-700">
                        Recommendation Data
                    </label>


                    <form onSubmit={handleRecommendation} className="mb-4">
                        <div className="mb-3">
                            <label
                                htmlFor="SystemSizeID"
                                className="block font-medium text-gray-700"
                            >
                                Electrisity Usage Size:
                            </label>
                            <select
                                id="ElectricityUsage"
                                name="ElectricityUsage"
                                value={inputDataRec.ElectricityUsage || ""}
                                onChange={handleInputChangeRec}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>
                                    Select System Size
                                </option>
                                {ElectricityUsage.map((size) => (
                                    <option key={size.id} value={size.label}>
                                        {size.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="SystemTypeID"
                                className="block font-medium text-gray-700"
                            >
                                System Type:
                            </label>
                            <select
                                id="SystemTypeID"
                                name="SystemTypeID"
                                value={inputDataRec.SystemTypeID || ""}
                                onChange={handleInputChangeRec}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>
                                    Select System Type
                                </option>
                                {systemTypes.map((type) => (
                                    <option key={type.id} value={type.label}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="SolarPanelID"
                                className="block font-medium text-gray-700"
                            >
                                Solar Panel:
                            </label>
                            <select
                                id="SolarPanelID"
                                name="SolarPanelID"
                                value={inputDataRec.SolarPanelID || ""}
                                onChange={handleInputChangeRec}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Solar Panel
                                </option>
                                {solarPanels.map((panel) => (
                                    <option key={panel.id} value={panel.label}>
                                        {panel.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="InverterID"
                                className="block font-medium text-gray-700"
                            >
                                Inverter:
                            </label>
                            <select
                                id="InverterID"
                                name="InverterID"
                                value={inputDataRec.InverterID || ""}
                                onChange={handleInputChangeRec}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Inverter
                                </option>
                                {inverters.map((inverter) => (
                                    <option key={inverter.id} value={inverter.label}>
                                        {inverter.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="BatteryID"
                                className="block font-medium text-gray-700"
                            >
                                Battery:
                            </label>
                            <select
                                id="BatteryID"
                                name="BatteryID"
                                value={inputDataRec.BatteryID || ""}
                                onChange={handleInputChangeRec}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>
                                    Select Battery
                                </option>
                                {batteries.map((battery) => (
                                    <option key={battery.id} value={battery.label}>
                                        {battery.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Get Recommendation
                        </button>
                    </form>

                    <ul>
                        {recommandData && recommandData.map((data) => <li>{data}</li>)}
                    </ul>


                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="flex flex-wrap -mx-2 mb-3">
                            <div className="w-full md:w-1/5 px-2 mb-3 md:mb-0">
                                <label
                                    htmlFor="SystemSizeID"
                                    className="block font-medium text-gray-700 mb-1"
                                >
                                    System Size:
                                </label>
                                <select
                                    id="SystemSizeID"
                                    name="SystemSizeID"
                                    value={inputData.SystemSizeID || ""}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select System Size
                                    </option>
                                    {systemSizes.map((size) => (
                                        <option key={size.id} value={size.id}>
                                            {size.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-1/5 px-2 mb-3 md:mb-0">
                                <label
                                    htmlFor="SystemTypeID"
                                    className="block font-medium text-gray-700 mb-1"
                                >
                                    System Type:
                                </label>
                                <select
                                    id="SystemTypeID"
                                    name="SystemTypeID"
                                    value={inputData.SystemTypeID || ""}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select System Type
                                    </option>
                                    {systemTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-1/5 px-2 mb-3 md:mb-0">
                                <label
                                    htmlFor="SolarPanelID"
                                    className="block font-medium text-gray-700 mb-1"
                                >
                                    Solar Panel:
                                </label>
                                <select
                                    id="SolarPanelID"
                                    name="SolarPanelID"
                                    value={inputData.SolarPanelID || ""}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Solar Panel
                                    </option>
                                    {solarPanels.map((panel) => (
                                        <option key={panel.id} value={panel.id}>
                                            {panel.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-1/5 px-2 mb-3 md:mb-0">
                                <label
                                    htmlFor="InverterID"
                                    className="block font-medium text-gray-700 mb-1"
                                >
                                    Inverter:
                                </label>
                                <select
                                    id="InverterID"
                                    name="InverterID"
                                    value={inputData.InverterID || ""}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Inverter
                                    </option>
                                    {inverters.map((inverter) => (
                                        <option key={inverter.id} value={inverter.id}>
                                            {inverter.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-full md:w-1/5 px-2">
                                <label
                                    htmlFor="BatteryID"
                                    className="block font-medium text-gray-700 mb-1"
                                >
                                    Battery:
                                </label>
                                <select
                                    id="BatteryID"
                                    name="BatteryID"
                                    value={inputData.BatteryID || ""}
                                    onChange={handleInputChange}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Battery
                                    </option>
                                    {batteries.map((battery) => (
                                        <option key={battery.id} value={battery.id}>
                                            {battery.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    {/**/}
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Predict Cost
                        </button>
                    </form>
                    {predictedCost && (
                        <>
                            <p className="mb-4">Predicted Cost: Rs. {predictedCost}</p>
                            <form onSubmit={handleSendEmail}>
                                <label
                                    htmlFor="email"
                                    className="block font-medium text-gray-700"
                                >
                                    Send Prediction to Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Send Email
                                </button>
                            </form>
                        </>
                    )}
                </Box>
            </div>
        </>
    );
};

export default Adviser;
