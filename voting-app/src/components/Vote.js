import React, { useState } from 'react';

const Vote = ({ refreshCandidates }) => {
    const [candidateId, setCandidateId] = useState('');

    const handleVote = async () => {
        refreshCandidates();
        alert('Vote cast successfully!');
    };

    return (
        <div>
            <h2>Vote</h2>
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
