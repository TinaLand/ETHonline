import React from 'react';

// Define the type for a single candidate
interface Candidate {
    id: number;
    name: string;
    votes: number;
}

// Define the props type for the Candidates component
interface CandidatesProps {
    candidates: Candidate[];
}

const Candidates: React.FC<CandidatesProps> = ({ candidates }) => {
    return (
        <div>
            <h2>Candidates</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>
                        <span className="candidate-name">{candidate.name}</span>
                        <span className="vote-count"> {candidate.votes} votes</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Candidates;
