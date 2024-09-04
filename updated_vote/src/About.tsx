import React from 'react';

const About: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>About LeaderVote</h1>
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionContent}>
            LeaderVote aims to empower citizens by making the voting process transparent, accessible, and impactful. We believe in the power of each vote and strive to provide a platform that enhances democratic engagement.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionContent}>
            Every user gets a chance to vote for their preferred leader. You can also donate Ethereum to support the campaigns of the leaders you believe in.
          </p>
        </section>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <p style={styles.sectionContent}>
            Our platform is secure, transparent, and easy to use. We ensure that every vote and donation is recorded on the blockchain, making the process verifiable and trustworthy.
          </p>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
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
  },
  sectionContent: {
    fontSize: '18px',
    color: '#555',
  },
};

export default About;
