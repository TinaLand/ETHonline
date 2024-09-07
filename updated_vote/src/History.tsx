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

  // Function to generate social media share URLs
  const getShareUrl = (platform: string, text: string, url: string) => {
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);
    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case "linkedin":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`;
      case "instagram":
        return `https://www.instagram.com/`;
      default:
        return "#";
    }
  };

  const shareText = "Check out the latest vote history on our app!";
  const pageUrl = window.location.href; // Current page URL

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Vote History</h1>
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Timestamp</th>
              <th style={styles.tableHeader}>Candidate</th>
              <th style={styles.tableHeader}>Donation Type</th>
              <th style={styles.tableHeader}>Donation Amount</th>
              <th style={styles.tableHeader}>Result</th>
              <th style={styles.tableHeader}>Win Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry) => (
              <tr key={entry.id}>
                <td style={styles.tableCell}>{new Date(entry.timestamp).toLocaleString()}</td>
                <td style={styles.tableCell}>{entry.candidate}</td>
                <td style={styles.tableCell}>{entry.donationType}</td>
                <td style={styles.tableCell}>{entry.donationAmount.toFixed(3)}</td>
                <td style={styles.tableCell}>{entry.result}</td>
                <td style={styles.tableCell}>{entry.winAmount.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.shareContainer}>
        <h2 style={styles.shareHeading}>Share This Page</h2>
        <a href={getShareUrl("twitter", shareText, pageUrl)} target="_blank" rel="noopener noreferrer" style={styles.shareButton}>
          Share on X (Twitter)
        </a>
        <a href={getShareUrl("facebook", shareText, pageUrl)} target="_blank" rel="noopener noreferrer" style={styles.shareButton}>
          Share on Facebook
        </a>
        <a href={getShareUrl("linkedin", shareText, pageUrl)} target="_blank" rel="noopener noreferrer" style={styles.shareButton}>
          Share on LinkedIn
        </a>
        <a href={getShareUrl("instagram", shareText, pageUrl)} target="_blank" rel="noopener noreferrer" style={styles.shareButton}>
          Share on Instagram
        </a>
      </div>
      
      </div>

    </div>
  );
};

// Function to generate mock data
const generateMockData = (): VoteHistory[] => {
  const candidates = ["Alice", "Bob", "Charlie"];
  const results = ["Successful", "Failed"];
  const donateTypes = ["ETH", "BTC", "Tether"];
  const mockData: VoteHistory[] = [];

  for (let i = 0; i < 10; i++) {
    const startDate = new Date("2022-01-01T00:00:00Z");
    const randomDays = Math.floor(Math.random() * 365 * 3); // Up to 3 years worth of days (for years 2020, 2021, and 2022)
    const timestamp = new Date(startDate.getTime() - randomDays * 24 * 60 * 60 * 1000).toISOString();

    const donationAmount = parseFloat((Math.random() * 100).toFixed(3));
    const isWinning = Math.random() > 0.5; // Randomly decide if the result is "Successful" or "Failed"
    const winAmount = isWinning ? donationAmount * 1.5 : 0; // Calculate win amount (for example, 1.5 times the donation amount if successful)

    mockData.push({
      id: `id${i}`,
      timestamp,
      candidate: candidates[Math.floor(Math.random() * candidates.length)],
      donationAmount,
      donationType: donateTypes[Math.floor(Math.random() * donateTypes.length)],
      result: results[Math.floor(Math.random() * results.length)],
      winAmount,
    });
  }

    // // Retrieve and parse the newVote data from localStorage
    const storedVote = localStorage.getItem("newVote");

    if (storedVote) {
    // Parse the storedVote data
    const parsedVote = JSON.parse(storedVote);

    // Create a new entry with polished code
    mockData.push({
        id: "11", // Or any unique ID you wish to assign
        timestamp: new Date().toISOString(), // Use the current date-time as timestamp
        candidate: parsedVote.name, // Access the candidate name from parsedVote
        donationAmount: parsedVote.donationAmount, // Access the donation amount from parsedVote
        donationType: donateTypes[Math.floor(Math.random() * donateTypes.length)], // Randomly select a donation type
        result: "pending", // Static result value
        winAmount: 0, // Static win amount value
    });

    // Optional: Log the updated mockData array to verify
    console.log(mockData);
    } else {
    console.error("No newVote data found in localStorage");
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
  shareContainer: {
    marginTop: "20px",
    textAlign: "center" as "center",
  },
  shareHeading: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  shareButton: {
    display: "inline-block",
    margin: "0 10px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default HistoryPage;
