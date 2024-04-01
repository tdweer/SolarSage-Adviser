import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ProjectsContextProvider } from './context/ProjectsContext'
import { ClientsContextProvider } from './context/ClientsContext'
import { SalesContextProvider } from './context/SalesContext'
import { StaffContextProvider } from './context/StaffContext'
import { AuthContextProvider } from './context/AuthContext'


// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
        <StaffContextProvider>
        <SalesContextProvider>
          <ClientsContextProvider>
           <ProjectsContextProvider>
              <App />
            </ProjectsContextProvider> 
          </ClientsContextProvider>
        </SalesContextProvider>
      </StaffContextProvider>
      </AuthContextProvider>
</React.StrictMode>,

  document.getElementById('root')
)
