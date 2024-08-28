const express = require('express');
const cors = require('cors');
const Web3 = require('web3');
const app = express();

app.use(cors());
app.use(express.json());

// Initialize Web3
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Replace these with your actual ABI and contract address
const contractABI = [ /* Your Contract ABI Here */ ];
const contractAddress = '0xYourContractAddressHere';

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Endpoint to handle login
app.post('/api/login', (req, res) => {
    const { address } = req.body;
    // Dummy token generation
    const token = 'dummy-token';
    res.json({ token });
});

// Endpoint to handle voting
app.post('/api/vote', async (req, res) => {
    const { candidateId } = req.body;
    const { address } = req.user; // Assuming JWT middleware adds this

    try {
        const tx = await contract.methods.vote(candidateId).send({ from: address });
        res.json({ message: 'Vote cast successfully!', transaction: tx });
    } catch (error) {
        console.error('Vote failed', error);
        res.status(500).json({ message: 'Failed to cast vote', error: error.message });
    }
});

// Endpoint to fetch candidates
app.get('/api/candidates', async (req, res) => {
    try {
        const count = await contract.methods.candidatesCount().call();
        const candidates = [];
        for (let i = 1; i <= count; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            candidates.push({ id: i, name: candidate[0], votes: candidate[1] });
        }
        res.json(candidates);
    } catch (error) {
        console.error('Failed to fetch candidates', error);
        res.status(500).json({ message: 'Failed to fetch candidates', error: error.message });
    }
});

app.listen(5000, () => {
    console.log('Backend server running on port 5000');
});
