import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContainer}>
                <div style={styles.footerLinks}>
                    <a href="#privacy" style={styles.footerLink}>Privacy Policy</a>
                    <a href="#terms" style={styles.footerLink}>Terms of Service</a>
                </div>
                <div style={styles.footerInfo}>
                    <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#f8f8f8',
        borderTop: '1px solid #ddd',
        padding: '20px 0',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
        width: '100%',
        // height: '10px',
    },
    footerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '500px',
        height: '10px',
    },
    footerLinks: {
        display: 'flex',
    },
    footerLink: {
        margin: '0 10px',
        textDecoration: 'none',
        color: '#333',
    },
    footerInfo: {
        marginTop: 'px',
    },
};

export default Footer;
