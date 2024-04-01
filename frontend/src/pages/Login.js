import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

const handleSubmit = async (e) => {
    e.preventDefault()
    
    await login(email, password)
}

return (   
    <form className="flex flex-col w-1/2 mx-auto justify-items-center" onSubmit={handleSubmit}>  
    <h3>Login</h3> 

    <div className="flex flex-row ">
        <label className="p-4">Email:</label>
        <input 
            className="w-44 m-4"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
    </div>
    <div className="flex flex-row ">
    <label className="p-4" >Password:</label>
    <input 
         className="w-44 m-4"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={[password]}    
    />
    </div>
    <div className="text-center">
    <button className="mx-auto bg-green-600 text-white p-2 rounded-lg " disabled={isLoading}>Log in</button>
    {error && <div className="error">{error}</div>}
    </div>
   
    <div><Link to="/signup">Don’t have an account? Sign Up</Link></div>
    </form>
)
}

export default Login