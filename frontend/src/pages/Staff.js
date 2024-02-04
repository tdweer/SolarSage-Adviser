import React from 'react'
import { useEffect, useState } from 'react'

//components
import StaffDetails from "../Components/StaffDetails"
import StaffForm from '../Components/StaffForm';

const Staff = () => {
    const [staff, setStaff] = useState(null)

    useEffect (() => {
        const fetchStaff = async() => {
          const response = await fetch('/api/staff')
          const json  = await response.json()
    
          if (response.ok) {
            setStaff(json)
        }
       }
       fetchStaff()
      },[])
    
    
      return (
        <div className='Projects'>
          <div className='projects'>
          {staff && staff.map((staff) => (
            <StaffDetails key={staff._id} staff={staff}/>
    
          ))}
    
    
    
    
          </div>
        <StaffForm/>
      
        </div>
      );
    };
    
    export default Staff;
    