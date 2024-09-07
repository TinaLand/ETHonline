import React, { useState, useEffect } from "react";

// Define types for candidate and cryptocurrency
interface Candidate {
  id: number;
  name: string;
  votes: number;
  donationAmount: number;
}

interface CryptoType {
  id: string;
  name: string;
}

const VotePage: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("ETH");
  const [donationAmount, setDonationAmount] = useState<number | "">(0);
  const [error, setError] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  // Sample candidates and cryptocurrency types
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: "Alice", votes: 5, donationAmount: 10 },
    { id: 2, name: "Bob", votes: 3, donationAmount: 20 },
    { id: 3, name: "Charlie", votes: 8, donationAmount: 15 },
  ]);

  const cryptoTypes: CryptoType[] = [
    { id: "ETH", name: "Ethereum" },
    { id: "BTC", name: "Bitcoin" },
    { id: "USDT", name: "Tether" },
  ];

  useEffect(() => {
    // Load candidates and vote status from localStorage
    const savedCandidates = localStorage.getItem("candidates");
    const savedHasVoted = localStorage.getItem("hasVoted");

    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }

    setHasVoted(savedHasVoted === "true");
  }, []);

  const updateCandidateData = (candidateId: number, amount: number) => {
    const updatedCandidates = candidates.map((candidate) => {
      if (candidate.id === candidateId) {
        return {
          ...candidate,
          votes: candidate.votes + 1,
          donationAmount: candidate.donationAmount + amount,
        };
      }
      return candidate;
    });

    setCandidates(updatedCandidates);
    localStorage.setItem("candidates", JSON.stringify(updatedCandidates));
  };

  const handleVote = () => {
    if (hasVoted) {
      setError("You have already voted.");
      return;
    }

    if (selectedCandidate === null || donationAmount <= 0) {
      setError("Please select a candidate and enter a valid donation amount.");
      return;
    }

    // Update candidate data
    updateCandidateData(selectedCandidate, parseFloat(donationAmount as string));

    // Save vote status to localStorage
    localStorage.setItem("hasVoted", "true");
    setHasVoted(true);

    // Clear form and error
    setSelectedCandidate(null);
    setDonationAmount(0);
    setSelectedCrypto("ETH");
    setError(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vote and Donate</h1>
      {error && <div style={styles.error}>{error}</div>}
      
      <div style={styles.mainContent}>
        {/* Donation Form */}
        <div style={styles.formContainer}>
          <div style={styles.formGroup}>
            <label htmlFor="candidate" style={styles.label}>Select Candidate:</label>
            <select
              id="candidate"
              value={selectedCandidate || ""}
              onChange={(e) => setSelectedCandidate(Number(e.target.value))}
              style={styles.select}
            >
              <option value="" disabled>Select a candidate</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="crypto" style={styles.label}>Select Crypto Type:</label>
            <select
              id="crypto"
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              style={styles.select}
            >
              {cryptoTypes.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="donationAmount" style={styles.label}>Donation Amount:</label>
            <input
              id="donationAmount"
              type="number"
              step="0.001" // Allows decimal places
              value={donationAmount || ""}
              onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
              placeholder="Enter amount"
              style={styles.input}
            />
          </div>

          <button onClick={handleVote} style={styles.submitButton} disabled={hasVoted}>
            {hasVoted ? "You Have Already Voted" : "Donate Now"}
          </button>
        </div>

        {/* Results Box */}
        <div style={styles.resultsBox}>
          <h2 style={styles.resultsHeading}>Candidates' Results</h2>
          <div style={styles.resultsContainer}>
            {candidates.map((candidate) => (
              <div key={candidate.id} style={styles.resultCard}>
                <h3 style={styles.candidateName}>{candidate.name}</h3>
                <p style={styles.candidateInfo}>Votes: {candidate.votes}</p>
                <p style={styles.candidateInfo}>Donations: {candidate.donationAmount.toFixed(3)} {selectedCrypto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  mainContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    gap: "20px",
  },
  formContainer: {
    flex: 1,
    maxWidth: "48%",
    marginBottom: "30px",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  resultsBox: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "1.1rem",
    marginBottom: "8px",
    color: "#555",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    backgroundColor: "#fff",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  submitButton: {
    padding: "12px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  submitButtonDisabled: {
    backgroundColor: "#6c757d",
    cursor: "not-allowed",
  },
  error: {
    color: "#d9534f",
    marginBottom: "20px",
    fontSize: "1.1rem",
  },
  resultsHeading: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#333",
    fontWeight: "bold",
  },
  resultsContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "15px",
  },
  resultCard: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
  },
  candidateName: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  candidateInfo: {
    fontSize: "1.1rem",
    color: "#555",
  },
};

export default VotePage;
