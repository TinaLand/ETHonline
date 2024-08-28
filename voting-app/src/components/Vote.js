import React, { useState } from 'react';
import axios from 'axios';

const Vote = ({ refreshCandidates }) => {
    const [candidateId, setCandidateId] = useState('');

    const handleVote = async () => {
        try {
            // Make the vote request
            await axios.post('http://localhost:5001/api/vote', { candidateId });
            alert('Vote cast successfully!');

            // Refresh the candidates list
            refreshCandidates();
        } catch (error) {
            console.error('Vote failed', error);
        }
    };

    return (
        <div>
            <input
                type="number"
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                placeholder="Enter candidate ID"
            />
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default Vote;
