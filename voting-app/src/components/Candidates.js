import React from 'react';

const Candidates = ({ candidates }) => {
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
