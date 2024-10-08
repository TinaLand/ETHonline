import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.headerContainer}>
                <div style={styles.logo}>My Website</div>
                <nav style={styles.navLinks}>
                    <a href="#home" style={styles.navLink}>Home</a>
                    <a href="#about" style={styles.navLink}>About</a>
                    <a href="#services" style={styles.navLink}>Services</a>
                    <a href="#contact" style={styles.navLink}>Contact</a>
                </nav>
                <div style={styles.profile}>
                    <img src="../images/profile-pic.jpg" alt="Profile" style={styles.profilePic} />
                </div>
            </div>
        </header>
    );
};

const styles = {
    header: {
        backgroundColor: '#fff',
        borderBottom: '1px solid #ddd',
        padding: '10px 20px',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
    },
    navLink: {
        margin: '0 15px',
        textDecoration: 'none',
        color: '#333',
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
    },
    profilePic: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
    },
};

export default Header;
