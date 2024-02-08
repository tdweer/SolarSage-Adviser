import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }


  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Solar-Sage Advisor</h1>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/advisor">Advisor</Link>
          </nav>


          <nav>
            <div>
              <button onClick={handleClick}>Logout</button>
        </div>
          <Link to="/login">Login</Link>
          <Link to="/signup" >Signup</Link>
        </nav>
        
        

      </div>
    </header>
  )
}

export default Navbar