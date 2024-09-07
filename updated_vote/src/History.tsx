import React, { useState, useEffect } from "react";

// Define type for vote history
interface VoteHistory {
  id: string;
  timestamp: string;
  user: string;
  candidate: string;
  donationAmount: number;
  result: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<VoteHistory[]>([]);

  useEffect(() => {
    // Load history from local storage
    const storedHistory = localStorage.getItem("voteHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vote History</h1>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Timestamp</th>
              <th style={styles.tableHeader}>User</th>
              <th style={styles.tableHeader}>Candidate</th>
              <th style={styles.tableHeader}>Donation Amount</th>
              <th style={styles.tableHeader}>Result</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td style={styles.tableCell}>{new Date(entry.timestamp).toLocaleString()}</td>
                <td style={styles.tableCell}>{entry.user}</td>
                <td style={styles.tableCell}>{entry.candidate}</td>
                <td style={styles.tableCell}>{entry.donationAmount.toFixed(3)}</td>
                <td style={styles.tableCell}>{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
