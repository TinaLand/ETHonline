import React, { useState } from 'react';
import Login from './components/Login';
import Vote from './components/Vote';
import Candidates from './components/Candidates';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div>
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Vote token={token} />
                    <Candidates />
                </>
            )}
        </div>
    );
};

export default App;
