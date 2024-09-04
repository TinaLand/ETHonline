// import React from 'react';

// const Header: React.FC = () => {
//     return (
//         <header style={styles.header}>
//             <div style={styles.headerContainer}>
//                 <div style={styles.logo}>The Great Vote</div>
//                 <nav style={styles.navLinks}>
//                     <a href="#home" style={styles.navLink}>Home</a>
//                     <a href="#about" style={styles.navLink}>About</a>
//                     <a href="#services" style={styles.navLink}>Services</a>
//                     <a href="#contact" style={styles.navLink}>Contact</a>
//                 </nav>
//                 <div style={styles.profile}>
//                     <img src="../images/profile-pic.jpg" alt="Profile" style={styles.profilePic} />
//                 </div>
//             </div>
//         </header>
//     );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//     header: {
//         backgroundColor: '#fff',
//         borderBottom: '1px solid #ddd',
//         padding: '10px 20px',
//         position: 'fixed',
//         width: '100%',
//         top: 0,
//         left: 0,
//         zIndex: 1000,
//     },
//     headerContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     logo: {
//         fontSize: '24px',
//         fontWeight: 'bold',
//     },
//     navLinks: {
//         display: 'flex',
//     },
//     navLink: {
//         margin: '0 15px',
//         textDecoration: 'none',
//         color: '#333',
//     },
//     profile: {
//         display: 'flex',
//         alignItems: 'center',
//     },
//     profilePic: {
//         width: '40px',
//         height: '40px',
//         borderRadius: '50%',
//     },
// };

// export default Header;


import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    // No need for onNavigate prop anymore
}

const Header: React.FC<HeaderProps> = () => {
    return (
        <header style={styles.header}>
            <div style={styles.headerContainer}>
                <div style={styles.logo}>The Great Vote</div>
                <nav style={styles.navLinks}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                    <Link to="/about" style={styles.navLink}>About</Link>
                    <Link to="/services" style={styles.navLink}>Services</Link>
                    <Link to="/contact" style={styles.navLink}>Contact</Link>
                </nav>
                <div style={styles.profile}>
                    {/* <img src="../images/profile-pic.jpg" alt="Profile" style={styles.profilePic} /> */}
                </div>
            </div>
        </header>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
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
        margin: '0 10px',
        textDecoration: 'none',
        color: '#333',
    },
    profile: {
        marginLeft: '20px',
    },
    profilePic: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
    },
};

export default Header;
