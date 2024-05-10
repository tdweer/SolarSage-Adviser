import * as React from 'react';
import {useEffect, useState} from 'react';
import AxAdminDashCard from "../../../components/AxAdminDashCard";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const AdminDashPage = () => {


    useEffect(() => {
        getTotalClients();
        getTotalProjects();
        getTotalSales();
        getTotalStaff();
    }, []);

    //STATE CREATE -----------------------------------------------------------
    let [total_Project, setTotal_Project] = useState(0);
    let [total_client, setTotal_Client] = useState(0);
    let [total_staff, setTotal_Staff] = useState(0);
    let [total_sales, setTotal_Sales] = useState(0);

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


    const getTotalClients = () => {
        try {
            fetch('http://localhost:4000/api/clients/total/counts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTotal_Client(data.count)
                }).catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } catch (e) {
            console.log(e)
        }
    }

    const getTotalProjects = () => {
        try {
            fetch('http://localhost:4000/api/projects/total/counts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTotal_Project(data.count);
                }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } catch (e) {
            console.log(e)
        }
    }

    const getTotalSales = () => {
        try {
            fetch('http://localhost:4000/api/sales/total/counts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTotal_Sales(data.count);
                }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } catch (e) {
            console.log(e)
        }
    }

    const getTotalStaff = () => {
        try {
            fetch('http://localhost:4000/api/staff/total/counts')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setTotal_Staff(data.count);
                    console.log("staff ========== ", data)
                }).catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <section className={"w100w h95h container flex_dir_col overFlowHidden-x"}>

            {/*Admin Cards ---------------------------------------------------*/}
            <div className={"w100w h150px container flex_dir_row"}>
                <AxAdminDashCard
                    TITLE={"Total Projects"}
                    VALUE={total_Project}
                    IMG={require('../../../assets/icon/project (1).png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Client"} VALUE={total_client}
                                 IMG={require('../../../assets/icon/customer-review.png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Staff"} VALUE={total_staff}
                                 IMG={require('../../../assets/icon/staff (1).png')}/>
                <div className={"w2"}/>
                <AxAdminDashCard TITLE={"Total Sales"} VALUE={total_sales}
                                 IMG={require('../../../assets/icon/graph.png')}/>
                <div className={"w2"}/>
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

                <div className={"w5 h100 container"}/>
            </div>
        </section>
    )
}
export default AdminDashPage;

