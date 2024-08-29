import React, { useState } from 'react';

const Vote = ({ refreshCandidates }) => {
    const [candidateId, setCandidateId] = useState('');
    const [hasVoted, setHasVoted] = useState(false);

    const handleVote = () => {
        if (hasVoted) {
            alert('You have already voted! Your vote will not be counted again.');
            return;
        }

        if (candidateId) {
            refreshCandidates(parseInt(candidateId));
            setHasVoted(true);
            setCandidateId(''); // Reset the input field after voting
        } else {
            alert('Please enter a candidate ID');
        }
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
            <button onClick={handleVote} disabled={hasVoted}>
                Vote
            </button>
        </div>
    );
};

export default Vote;
