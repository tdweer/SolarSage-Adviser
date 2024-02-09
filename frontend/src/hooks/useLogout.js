import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext() 

    const logout = async () => {
        //remove user from local storage    
        localStorage.removeItem('user')

        //disopatch the logout action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}


}