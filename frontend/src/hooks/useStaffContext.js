import { StaffContext } from "../context/StaffContext"
import { useContext } from "react"


export const useStaffContext = () => {
    const context  = useContext(StaffContext)
    
    if (!context){
        throw Error('useStaffContext must be used inside StaffContextProvider')
    }


    return context
}