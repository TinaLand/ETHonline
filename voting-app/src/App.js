import React, { useState } from 'react';
import './styles.css'; // Import the global stylesheet
import Login from './components/Login';
import Vote from './components/Vote';
import Candidates from './components/Candidates';

const App = () => {
    const [token, setToken] = useState('');
    const [refresh, setRefresh] = useState(0);

    const refreshCandidates = () => {
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="container">
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
