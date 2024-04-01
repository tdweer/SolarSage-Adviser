import React from 'react';

import home from '../images/admin.png';
import advisor from '../images/advisor.png';
import project from '../images/project.png';
import staff from '../images/staff.png';
import sales from '../images/sales.png';
import client from '../images/client.png';

const SideTab = () => {
    return (
        <div className="flex flex-col w-64 bg-primaryBack h-screen" >
            <div className='flex flex-row p-2 justify-center mt-5'> <h1 className='text-white text-xl'> Admin Dashboard </h1> </div>
            
            <div className='pt-10 pl-4'>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={home} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Dashboard</h1>
                </button>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={advisor} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Adviser</h1>
                </button>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={project} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Projects</h1>
                </button>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={client} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Clients</h1>
                </button>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={staff} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Staff</h1>
                </button>
                <button className='p-2 justify-start flex flex-row pb-5' >
                    <img src={sales} className='w-10'/>
                    <h1 className='text-md justify-center text-white pt-2 pl-10'>Sales</h1>
                </button>
            </div>
            
        </div>
    );
};

export default SideTab;