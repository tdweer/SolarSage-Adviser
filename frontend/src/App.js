import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Dashboard from './pages/Dashboard'
import Advisor from './pages/Advisor'
import Projects from './pages/Projects'
import Clients from './pages/Clients'
import Staff from './pages/Staff'
import Sales from './pages/Sales'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const { user } = useAuthContext()
  
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
               element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/advisor" 
              element={user ? <Advisor /> : <Navigate to="/login" />}
            />
            {/* <Route 
              path="/dashboard" 
              element={<Dashboard />}
            /> */}
            <Route 
              path="/projects" 
              element={user ? <Projects />: <Navigate to="/login" />}
            />
            <Route 
              path="/clients" 
              element={user ?  <Clients /> : <Navigate to="/login" />}
            />
            <Route 
              path="/staff" 
              element={user ? <Staff /> : <Navigate to="/login" />  }
            />
             <Route 
              path="/sales" 
              element={<Sales />}
            />
            <Route 
              path="/login" 
              element={!user ? <Login />: <Navigate to="/" />}
            />
            <Route 
              path="/signup" 
              element={!user ?  <Signup />: <Navigate to="/" />}
            />
            

            
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;