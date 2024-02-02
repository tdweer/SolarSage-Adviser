import React from 'react'
import { useEffect, useState } from 'react'

//components
import SalesDetails from "../Components/SalesDetails"


const Sales = () => {
    const [sales, setSales] = useState(null)

    useEffect (() => {
        const fetchSales = async() => {
          const response = await fetch('/api/sales')
          const json  = await response.json()
    
          if (response.ok) {
            setSales(json)
        }
       }
       fetchSales()
      },[])
    
    
      return (
        <div className='sales'>
          <div className='sales'>
          {sales && sales.map((sales) => (
            <SalesDetails key={sales._id} sales={sales}/>
    
          ))}
    
    
    
    
          </div>
        
      
        </div>
      );
    };
    
    export default Sales;
    