import React from 'react';

// Example Profile Data
const profileData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  accountAddress: '0x1234...abcd',
  balance: '5.432 ETH',
};

const ProfileContent: React.FC = () => {
  return (
    <div style={styles.container}>
      {/* <h3 style={styles.heading}>Profile</h3> */}
      <div style={styles.card}>
        <div style={styles.cardContent}>
          <div style={styles.field}>
            <span style={styles.label}>Name:</span>
            <span style={styles.value}>{profileData.name}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{profileData.email}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Account Address:</span>
            <span style={styles.value}>{profileData.accountAddress}</span>
          </div>
          <div style={styles.field}>
            <span style={styles.label}>Balance:</span>
            <span style={styles.value}>{profileData.balance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#343a40',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
    padding: '1.5rem',
    boxSizing: 'border-box',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #e9ecef',
  },
  label: {
    fontWeight: 'bold',
    color: '#495057',
  },
  value: {
    color: '#212529',
  },
};

export default ProfileContent;
