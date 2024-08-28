import React, { useState } from 'react';

const Login = ({ setToken }) => {
    const [address, setAddress] = useState('');

    const handleLogin = () => {
        setToken('dummyToken'); // Set a dummy token to simulate login
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
