import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome to LeaderVote</h1>
        <p style={styles.subtitle}>Your Vote, Your Leader, Your Future</p>
        {/* <img
          src="https://source.unsplash.com/featured/?vote"
          alt="Voting Banner"
          style={styles.headerImage}
        /> */}
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Vote?</h2>
          {/* <img
            src="https://source.unsplash.com/featured/?democracy"
            alt="Why Vote"
            style={styles.sectionImage}
          /> */}
          <p style={styles.sectionContent}>
            Voting is the cornerstone of democracy. Your vote decides the future leaders who will represent you and your community.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Support Your Leader</h2>
          {/* <img
            src="https://source.unsplash.com/featured/?leadership"
            alt="Support Leader"
            style={styles.sectionImage}
          /> */}
          <p style={styles.sectionContent}>
            Not only can you vote for your preferred leader, but you can also donate Crypto to support their campaign.
          </p>
        </section>
        {/* <button style={styles.button}>Get Started</button> */}
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f4f4f4',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: '20px',
    color: '#777',
    marginBottom: '20px',
  },
  headerImage: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  section: {
    marginBottom: '30px',
    textAlign: 'center' as const,
    maxWidth: '800px',
  },
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#444',
    marginBottom: '15px',
  },
  sectionImage: {
    width: '100%',
    maxHeight: '250px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  sectionContent: {
    fontSize: '18px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
