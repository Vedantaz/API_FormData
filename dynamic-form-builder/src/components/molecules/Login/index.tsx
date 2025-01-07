import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login :React.FC = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e:React.FormEvent) =>{
        
        e.preventDefault();

        // call an api to verify credentials
        const res = await fetch('http://localhost:4000/login', {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email, password}),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();

        console.log(data);
        
        if (data.success) {
            console.log('Login successful:', data.message);
            console.log('Token:', data.token);
            localStorage.setItem('authToken', data.token);
            navigate('/form');
        } else {
            console.error('Login failed:', data.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;