import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileContent from './ProfileContent';

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  sidebar: {
    width: '200px', // Reduced width for a slimmer sidebar
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#343a40', // Dark background for sidebar
    color: '#ffffff',
    padding: '1rem',
    boxSizing: 'border-box',
    position: 'fixed', // Fix the sidebar to the left
    top: 0,
    left: 0,
    height: '100vh',
  },
  contentArea: {
    flex: 1,
    marginLeft: '200px', // Adjust margin to match the sidebar width
    backgroundColor: '#ffffff',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    marginBottom: '0.5rem',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '0.25rem',
    backgroundColor: '#6c757d',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonActive: {
    backgroundColor: '#0056b3',
  },
  heading: {
    marginBottom: '1rem',
  }
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'history':
        return <HistoryContent />;
      case 'vote':
        return <VoteContent />;
      case 'share':
        return <ShareContent />;
      default:
        return <ProfileContent />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.heading}>Dashboard</h2>
        <button
          style={{
            ...styles.button,
            ...(activeTab === 'profile' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeTab === 'history' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeTab === 'vote' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('vote')}
        >
          Vote
        </button>
        <button
          style={{
            ...styles.button,
            ...(activeTab === 'share' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('share')}
        >
          Social Media Share
        </button>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
};

// Example content components
// const ProfileContent = () => (
//   <div>
//     <h3>Profile</h3>
//     <p>Your profile details go here.</p>
//   </div>
// );

const HistoryContent = () => (
  <div>
    <h3>History</h3>
    <p>Your voting history details go here.</p>
  </div>
);

const VoteContent = () => (
  <div>
    <h3>Vote</h3>
    <p>Voting functionality details go here.</p>
  </div>
);

const ShareContent = () => (
  <div>
    <h3>Social Media Share</h3>
    <p>Share options and details go here.</p>
  </div>
);

export default Dashboard;
