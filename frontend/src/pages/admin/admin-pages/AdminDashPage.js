
import * as React from 'react';
import AxAdminDashCard from "../../../components/AxAdminDashCard";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart, Line, Pie, PieChart
} from 'recharts';
import {useEffect, useState} from "react";

const AdminDashPage = () => {

    useEffect(() => {

    }, []);

    //STATE CREATE -----------------------------------------------------------
    let [total_product, setTotal_Product] = useState(0);
    let [total_client, setTotal_Client] = useState(0);
    let [total_employee, setTotal_Employee] = useState(0);
    let [total_supplier, setTotal_Supplier] = useState(0);
    let [total_orders, setTotal_Orders] = useState(0);

    const data = [
        {
            name: 'Jan',
            Loss: 1890,
            Profit: 4800,
            amt: 2181,
        },
        {
            name: 'Feb',
            Loss: 1000,
            Profit: 6900,
            amt: 2100,
        },
        {
            name: 'Mar',
            Loss: 1220,
            Profit: 3009,
            amt: 2100,
        },
        {
            name: 'Apr',
            Loss: 2780,
            Profit: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            Loss: 1800,
            Profit: 7000,
            amt: 2100,

        },
        {
            name: 'June',
            Loss: 2390,
            Profit: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            Loss: 3490,
            Profit: 4300,
            amt: 2100,
        },
        {
            name: 'Aug',
            Loss: 2390,
            Profit: 4000,
            amt: 2100,
        },
        {
            name: 'Sep',
            Loss: 720,
            Profit: 5900,
            amt: 2100,
        },
        {
            name: 'Oct',
            Loss: 2000,
            Profit: 9800,
            amt: 2290,

        },
        {
            name: 'Nov',
            Loss: 3000,
            Profit: 1398,
            amt: 2210,

        },
        {
            name: 'Dec',
            Loss: 4000,
            Profit: 2400,
            amt: 2400,
        },
    ];
    const data2 = [
        {
            name: 'Jan',
            Outgoing: 1890,
            Income: 4800,
            amt: 2181,
        },
        {
            name: 'Feb',
            Outgoing: 1000,
            Income: 6900,
            amt: 2100,
        },
        {
            name: 'Mar',
            Outgoing: 1220,
            Income: 3009,
            amt: 2100,
        },
        {
            name: 'Apr',
            Outgoing: 2780,
            Income: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            Outgoing: 1800,
            Income: 7000,
            amt: 2100,

        },
        {
            name: 'June',
            Outgoing: 2390,
            Income: 3800,
            amt: 2500,
        },
        {
            name: 'July',
            Outgoing: 3490,
            Income: 4300,
            amt: 2100,
        },
        {
            name: 'Aug',
            Outgoing: 2390,
            Income: 4000,
            amt: 2100,
        },
        {
            name: 'Sep',


            Outgoing: 720,
            Income: 5900,
            amt: 2100,
        },
        {
            name: 'Oct',
            Outgoing: 2000,
            Income: 9800,
            amt: 2290,

        },
        {
            name: 'Nov',
            Outgoing: 3000,
            Income: 1398,
            amt: 2210,

        },
        {
            name: 'Dec',
            Outgoing: 4000,
            Income: 2400,
            amt: 2400,
        },
    ];
    const data3 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <section className={"w100w h95h container flex_dir_col overFlowHidden-x"}>

            {/*Admin Cards ---------------------------------------------------*/}
            <div className={"w100w h150px container flex_dir_row"}>
                <AxAdminDashCard TITLE={"Total Projects"} VALUE={total_product}
                                 IMG={require('../../../assets/icon/product.png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Customers"} VALUE={total_client} IMG={require('../../../assets/icon/user.png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Staff"} VALUE={total_supplier} IMG={require('../../../assets/icon/user.png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Sales"} VALUE={total_employee} IMG={require('../../../assets/icon/user.png')}/>
                <div className={"w2"}/>
                {/*<AxAdminDashCard TITLE={"Total Orders"} VALUE={total_orders} IMG={require('../../../assets/icon/order.png')}/>*/}
            </div>

            <div className={"h5"}/>

            <div className={"w100w h350px container"}>
                <div className={"w38 h100 container"}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="Profit" stackId="a" fill="#1976D3"/>
                            <Bar dataKey="Loss" stackId="a" fill="#59A8F6"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={"w38 h100 container"}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data2}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Line type="monotone" dataKey="Income" stroke="#1976D3" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="Outgoing" stroke="#82ca9d"/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={"w20 h100 container"}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data3}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    )
}
export default AdminDashPage;

