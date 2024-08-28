const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const web3 = new Web3('http://localhost:8545'); // Replace with your Ethereum node URL

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/votingapp', { useNewUrlParser: true, useUnifiedTopology: true });

// User Schema
const UserSchema = new mongoose.Schema({
    address: String,
    name: String,
    votes: Number
});
const User = mongoose.model('User', UserSchema);

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// API endpoints
app.post('/api/vote', authenticateJWT, async (req, res) => {
    const { candidateId } = req.body;
    const { address } = req.user;

    // Interact with smart contract
    const contract = new web3.eth.Contract(/* ABI */, 'YOUR_CONTRACT_ADDRESS');
    try {
        await contract.methods.vote(candidateId).send({ from: address });
        res.send('Vote cast successfully!');
    } catch (error) {
        res.status(500).send('Failed to cast vote');
    }
});

app.get('/api/candidates', async (req, res) => {
    const contract = new web3.eth.Contract(/* ABI */, 'YOUR_CONTRACT_ADDRESS');
    try {
        const count = await contract.methods.candidatesCount().call();
        const candidates = [];
        for (let i = 1; i <= count; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            candidates.push({ id: i, name: candidate[0], votes: candidate[1] });
        }
        res.json(candidates);
    } catch (error) {
        res.status(500).send('Failed to fetch candidates');
    }
});

app.post('/api/login', async (req, res) => {
    const { address } = req.body;
    const user = await User.findOne({ address });

    if (user) {
        const token = jwt.sign({ address }, 'your_jwt_secret');
        res.json({ token });
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
