import React, { useEffect, useState } from 'react';

const Candidates = ({ refresh }) => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        // Dummy data for candidates
        const dummyCandidates = [
            { id: 1, name: 'Candidate 1', votes: 10 },
            { id: 2, name: 'Candidate 2', votes: 20 },
            { id: 3, name: 'Candidate 3', votes: 5 }
        ];
        setCandidates(dummyCandidates);
    }, [refresh]);

    return (
        <div>
            <h2>Candidates</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>
                        {candidate.name}: {candidate.votes} votes
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Candidates;
