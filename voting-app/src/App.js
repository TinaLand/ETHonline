import React, { useState } from 'react';
import './styles.css'; // Import the updated global stylesheet
import Login from './components/Login';
import Vote from './components/Vote';
import Candidates from './components/Candidates';
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
    const [token, setToken] = useState('');
    const [candidates, setCandidates] = useState([
        { id: 1, name: 'Candidate 1', votes: 10 },
        { id: 2, name: 'Candidate 2', votes: 20 },
        { id: 3, name: 'Candidate 3', votes: 5 }
    ]);
    const [hasVoted, setHasVoted] = useState(false);

    const refreshCandidates = (votedCandidateId) => {
        setCandidates((prevCandidates) => 
            prevCandidates.map((candidate) =>
                candidate.id === votedCandidateId
                    ? { ...candidate, votes: candidate.votes + 1 }
                    : candidate
            )
        );
        setHasVoted(true); // Ensure the user can't vote again
    };


    
    return (
        <div className="app">
            <Header />
                <main>
                    <div className="container">
                        {!token ? (
                            <Login setToken={setToken} />
                        ) : (
                            <>
                                <Vote refreshCandidates={refreshCandidates} />
                                <Candidates candidates={candidates} />
                            </>
                        )}
                    </div>
                </main>
            <Footer />
        </div>


    );
};

export default App;
