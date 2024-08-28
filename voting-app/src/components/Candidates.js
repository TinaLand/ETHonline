import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Candidates = ({ refresh }) => {
    const [candidates, setCandidates] = useState([]);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Failed to fetch candidates', error);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [refresh]); // Fetch candidates when `refresh` changes

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
