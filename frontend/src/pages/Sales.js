import React from 'react'
import { useEffect } from 'react'
import { useSalesContext } from '../hooks/useSalesContext'

//components
import SalesDetails from "../Components/SalesDetails"
import SalesForm from "../Components/SalesForm"


const Sales = () => {
    const { sales, dispatch} = useSalesContext()

    useEffect (() => {
        const fetchSales = async() => {
          const response = await fetch('/api/sales')
          const json  = await response.json()
    
          if (response.ok) {
            dispatch({type: 'SET_SALES', payload: json})
        }
       }
       fetchSales()
      },[])
    
    
      return (
        <div className='Projects'>
          <div className='projects'>
          {sales && sales.map((sales) => (
            <SalesDetails key={sales._id} sales={sales}/>
    
          ))}
    
    
    
    
          </div>
        
            <SalesForm />
        </div>
      );
    };
    
    export default Sales;
    