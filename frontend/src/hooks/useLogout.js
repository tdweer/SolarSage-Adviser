import { useAuthContext } from "./useAuthContext"
import { useProjectsContext } from "./useProjectsContext"
// import { useClientsContext } from "./useClientsContext"
// import { useSalesContext } from "./useSalesContext"
// import { useStaffContext } from "./useStaffContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: projectsDispatch} = useProjectsContext() 
 
    // const { dispatch: clientsDispatch} = useClientsContext() 
    // const { dispatch: salesDispatch} = useSalesContext()
    // const { dispatch: staffDispatch} = useStaffContext()

    const logout = async () => {
        //remove user from local storage    
        localStorage.removeItem('user')

        //disopatch the logout action
        dispatch({type: 'LOGOUT'})
        projectsDispatch({type: 'SET_PROJECTS', payload: null})
        // clientsDispatch({type: 'SET_CLIENTS', payload: null})
        // salesDispatch({type: 'SET_SALES', payload: null})
        // staffDispatch({type: 'SET_STAFF', payload: null})
    }

    return {logout}


}