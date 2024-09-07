import React, { useState, useEffect } from "react";

// Define type for vote history
interface VoteHistory {
  id: string;
  timestamp: string;
  candidate: string;
  donationAmount: number;
  donationType: string;
  result: string;
  winAmount: number;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<VoteHistory[]>([]);

  useEffect(() => {
    // Generate mock data
    const mockHistory: VoteHistory[] = generateMockData();
    setHistory(mockHistory);

    // Optionally, you can also save this mock data to localStorage for testing
    localStorage.setItem("voteHistory", JSON.stringify(mockHistory));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vote History</h1>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Timestamp</th>
              {/* <th style={styles.tableHeader}>User</th> */}
              <th style={styles.tableHeader}>Candidate</th>
              <th style={styles.tableHeader}>Donation cypto type</th>
              <th style={styles.tableHeader}>Donation Amount</th>
              <th style={styles.tableHeader}>Result</th>
              <th style={styles.tableHeader}>Win amount</th>

            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
                <tr key={entry.id}>
                <td style={styles.tableCell}>{new Date(entry.timestamp).toLocaleString()}</td>
                <td style={styles.tableCell}>{entry.candidate}</td>
                <td style={styles.tableCell}>{entry.donationAmount.toFixed(3)}</td>
                <td style={styles.tableCell}>{entry.donateType}</td>
                <td style={styles.tableCell}>{entry.result}</td>
                <td style={styles.tableCell}>{entry.winAmount.toFixed(3)}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to generate mock data
const generateMockData = (): VoteHistory[] => {
//   const users = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const candidates = ["Alice", "Bob", "Charlie"];
  const results = ["Successful", "Failed"];
  const donateTypes = ["ETH", "BTC", "Tether"]
  const mockData: VoteHistory[] = [];

for (let i = 0; i < 10; i++) {
    const startDate = new Date("2022-01-01T00:00:00Z");
    const randomDays = Math.floor(Math.random() * 365 * 3); // Up to 3 years worth of days (for years 2020, 2021, and 2022)
    const timestamp = new Date(startDate.getTime() - randomDays * 24 * 60 * 60 * 1000).toISOString();
  
    const donationAmount = parseFloat((Math.random() * 100).toFixed(3));
    const isWinning = Math.random() > 0.5; // Randomly decide if the result is "Successful" or "Failed"
    const winAmount = isWinning ? donationAmount * 1.5 : 0; // Calculate win amount (for example, 1.5 times the donation amount if successful)
  
    console.log(`Donation Amount: ${donationAmount}, Is Winning: ${isWinning}, Win Amount: ${winAmount}`); // Debug log
  
    mockData.push({
      id: `id${i}`,
      timestamp,
      candidate: candidates[Math.floor(Math.random() * candidates.length)],
      donationAmount,
      donateType: donateTypes[Math.floor(Math.random() * donateTypes.length)],
      result: results[Math.floor(Math.random() * results.length)],
      winAmount,
    });
  }
  

  return mockData;
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
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
  },
  tableHeader: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left" as "left",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
};

export default HistoryPage;
