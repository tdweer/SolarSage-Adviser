import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Solar-Sage Advisor</h1>
        </Link>
        {/* <h1 className= "material-symbols-outlined">Dashboard</h1> */}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/advisor">Advisor</Link>
          
        </nav>
        
        
        <Link to="/logout" className="material-symbols-outlined">
          Logout
        </Link>

      </div>
    </header>
  )
}

export default Navbar