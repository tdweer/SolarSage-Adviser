import { BrowserRouter, Routes, Route, } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Dashboard from './pages/Dashboard'
import Advisor from './pages/Advisor'
import Projects from './pages/Projects'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home />} 
            />
            <Route 
              path="/advisor" 
              element={<Advisor />}
            />
            <Route 
              path="/dashboard" 
              element={<Dashboard />}
            />
            <Route 
              path="/projects" 
              element={<Projects />}
            />

            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;