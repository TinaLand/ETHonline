import React, { useState } from 'react';

const Login = ({ setToken }) => {
    const [address, setAddress] = useState('');

    const handleLogin = () => {
        setToken('dummyToken'); // Simulate a successful login
    };

    return (
        <div>
            <h2>Login</h2>
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
