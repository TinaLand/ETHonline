import React from 'react';

const Contact: React.FC = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Contact Us</h1>
      </header>
      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Get in Touch</h2>
          <p style={styles.sectionContent}>
            Have questions, feedback, or need support? We're here to help! Reach out to us using the form below, and we'll get back to you as soon as possible.
          </p>
        </section>
        <form style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Name</label>
            <input style={styles.input} type="text" id="name" name="name" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input style={styles.input} type="email" id="email" name="email" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea style={styles.textarea} id="message" name="message"></textarea>
          </div>
          <button style={styles.button} type="submit">Send Message</button>
        </form>
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
    maxWidth: '600px',
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
  form: {
    width: '100%',
    maxWidth: '600px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '150px',
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

export default Contact;
