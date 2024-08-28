const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Dummy data
let candidates = [
    { id: 1, name: 'Alice', votes: 0 },
    { id: 2, name: 'Bob', votes: 0 }
];
const votes = {};

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { address } = req.body;
    // Simple dummy token generation
    const token = 'dummy-token';
    res.json({ token });
});

// Endpoint to handle voting
app.post('/api/vote', (req, res) => {
    const { candidateId } = req.body;
    const { token } = req.headers;

    if (token !== 'dummy-token') {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!votes[token]) {
        votes[token] = true;
        candidates = candidates.map(candidate =>
            candidate.id === candidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
        );
        res.json({ message: 'Vote cast successfully!' });
    } else {
        res.status(400).json({ message: 'You have already voted' });
    }
});

// Endpoint to fetch candidates
app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

app.listen(5001, () => {
    console.log('Backend server running on port 5000');
});
