import  {  createContext, useReducer } from 'react'

export const SalesContext = createContext()

export const salesReducer = (state, action) => {
    switch(action.type) {
        case 'SET_SALES':
            return {
                sales: action.payload
            }
        case 'CREATE_SALE':
            return {
                sales: [action.payload, ...state.sales]
            }
        case 'DELETE_SALE':
            return {
                sales: state.sales.filter((sale) => sale._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const SalesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(salesReducer,{
        sales: null

    
    })

    

    return (
        <SalesContext.Provider value = {{ ...state, dispatch }} >
            { children }
        </SalesContext.Provider>
    )
}