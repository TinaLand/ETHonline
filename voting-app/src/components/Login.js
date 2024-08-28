import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [address, setAddress] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', { address });
            setToken(response.data.token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
