import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';
import App from './App';
import { ProjectsContextProvider } from './context/ProjectsContext'
import { ClientsContextProvider } from './context/ClientsContext'
import { SalesContextProvider } from './context/SalesContext'

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <React.StrictMode>
    <ProjectsContextProvider>
    <ClientsContextProvider>
      <SalesContextProvider>
      <App />
      </SalesContextProvider>
      </ClientsContextProvider>
    </ProjectsContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
)
