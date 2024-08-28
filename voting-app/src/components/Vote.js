import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const Vote = ({ token }) => {
    const [candidateId, setCandidateId] = useState('');

    const handleVote = async () => {
        try {
            await axios.post(
                'http://localhost:5000/api/vote',
                { candidateId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Vote cast successfully!');
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
