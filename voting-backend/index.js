const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let candidates = [
    { id: 1, name: 'Candidate 1', votes: 0 },
    { id: 2, name: 'Candidate 2', votes: 0 },
    { id: 3, name: 'Candidate 3', votes: 0 }
];

// Fake login endpoint: always return a dummy token
app.post('/api/login', (req, res) => {
    // No matter the input, always return the same token
    res.json({ token: 'dummy-token' });
});

// Voting endpoint (no token validation needed)
app.post('/api/vote', (req, res) => {
    const { candidateId } = req.body;
    const candidate = candidates.find(c => c.id === parseInt(candidateId));
    if (candidate) {
        candidate.votes += 1;
        res.status(200).send('Vote cast successfully');
    } else {
        res.status(404).send('Candidate not found');
    }
});

// Fetch candidates
app.get('/api/candidates', (req, res) => {
    res.json(candidates);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
