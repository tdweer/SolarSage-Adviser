import  {  createContext, useReducer } from 'react'

export const SalesContext = createContext()

export const salesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SALES':
            return {
                SaleS: action.payload
            }
        case 'CREATE_SALE':
            return {
                Sales: [action.payload, ...state.sales]
            }
        case 'DELETE_SALE':
            return {
                Sales: state.SaleS.filter((Sale) => Sale._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const SalesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(salesReducer,{
        Sales: null

    
    })

    

    return (
        <SalesContext.Provider value = {{ ...state, dispatch }} >
            { children }
        </SalesContext.Provider>
    )
}