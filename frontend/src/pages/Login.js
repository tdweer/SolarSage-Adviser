import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-center">Login</h3>

                <div className="flex flex-col space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Password:</span>
                        <input
                            className="form-input mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </label>
                </div>

                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    Log in
                </button>

                {error && (
                    <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        {error}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link to="/signup" className="text-blue-500 hover:text-blue-800">Don’t have an account? Sign Up</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
