import React, { useState } from 'react';
import Login from './components/Login';
import Vote from './components/Vote';
import Candidates from './components/Candidates';

const App = () => {
    const [token, setToken] = useState('');
    const [refresh, setRefresh] = useState(0); // State to trigger refresh

    const refreshCandidates = () => {
        setRefresh(prev => prev + 1); // Update refresh state to trigger re-fetch
    };

    return (
        <div>
            {!token ? (
                <Login setToken={setToken} />
            ) : (
                <>
                    <Vote refreshCandidates={refreshCandidates} />
                    <Candidates refresh={refresh} />
                </>
            )}
        </div>
    );
};

export default App;
