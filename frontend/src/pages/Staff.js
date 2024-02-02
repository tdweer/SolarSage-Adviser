import React from 'react'
import { useEffect, useState } from 'react'

//components
import StaffDetails from "../Components/StaffDetails"


const Staffs = () => {
    const [staffs, setStaffs] = useState(null)

    useEffect (() => {
        const fetchStaffs = async() => {
          const response = await fetch('/api/staffs')
          const json  = await response.json()
    
          if (response.ok) {
            setStaffs(json)
        }
       }
       fetchStaffs()
      },[])
    
    
      return (
        <div className='staffs'>
          <div className='staffs'>
          {staffs && staffs.map((client) => (
            <StaffDetails key={client._id} client={client}/>
    
          ))}
    
    
    
    
          </div>
        
      
        </div>
      );
    };
    
    export default Staffs;
    