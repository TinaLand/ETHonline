import React, { useState, ChangeEvent } from 'react';

interface VoteProps {
    refreshCandidates: (candidateId: number) => void; // Define the type for refreshCandidates
}

const Vote: React.FC<VoteProps> = ({ refreshCandidates }) => {
    const [candidateId, setCandidateId] = useState<string>(''); // Candidate ID is a string initially
    const [hasVoted, setHasVoted] = useState<boolean>(false); // hasVoted is a boolean

    const handleVote = () => {
        if (hasVoted) {
            alert('You have already voted! Your vote will not be counted again.');
            return;
        }

        if (candidateId) {
            refreshCandidates(parseInt(candidateId)); // Parse the candidate ID as a number
            setHasVoted(true);
            setCandidateId(''); // Reset the input field after voting
        } else {
            alert('Please enter a candidate ID');
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCandidateId(e.target.value); // Handle the input change
    };

    return (
        <div>
            <h2>Vote</h2>
            <input
                type="number"
                value={candidateId}
                onChange={handleInputChange}
                placeholder="Enter candidate ID"
            />
            <button onClick={handleVote} disabled={hasVoted}>
                Vote
            </button>
        </div>
    );
};

export default Vote;
