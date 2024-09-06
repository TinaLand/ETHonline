// donate.tsx
import React, { useState } from 'react';

// Define the props interface for the Donate component
interface DonateProps {
  recipientAddress: string; // Address where ETH will be sent
  onSuccess?: () => void; // Callback function when donation is successful
  onError?: (error: Error) => void; // Callback function for handling errors
}

// const Donate: React.FC<DonateProps> = ({ recipientAddress, onSuccess, onError }) => {

const Donate: React.FC<DonateProps> = ({ recipientAddress }) => {
  const [amount, setAmount] = useState<string>('');
  const [hasDonated, setHasDonated] = useState<boolean>(false);

  const handleDonate = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    try {
      // Implement the actual function to send ETH transaction
      await sendEthTransaction(amount, recipientAddress);
      setHasDonated(true);
    //   if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error sending donation:', error);
    //   if (onError) onError(error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount in ETH"
        min="0"
        step="0.01"
      />
      <button onClick={handleDonate} disabled={hasDonated || !amount}>
        Donate ETH
      </button>
    </div>
  );
};

// Example function to send ETH (replace with actual implementation)
const sendEthTransaction = async (amount: string, recipientAddress: string) => {
  // Implement your Ethereum transaction logic here
  // For example, using ethers.js:
  // const { ethers } = require('ethers');
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const tx = await signer.sendTransaction({
  //   to: recipientAddress,
  //   value: ethers.utils.parseEther(amount),
  // });
  console.log(`Sending ${amount} ETH to ${recipientAddress}`);
};

export default Donate;
