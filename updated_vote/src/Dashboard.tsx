import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileContent from './ProfileContent';
import VotePage from './VotePage';
import History from './History';
import Home from './Home';
import Header from './Header'; // assuming you are using it somewhere else
import Footer from './Footer'; // assuming you are using it somewhere else
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import RPC from "./ethersRPC"; // assuming it's used somewhere else
import EthereumRPC from "./ethereumRPC"; // assuming it's used somewhere else
import Signature from "./Signature";

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  mainContent: {
    flex: 1,
  },
  sidebar: {
    width: '200px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '1rem',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
  },
  contentArea: {
    flex: 1,
    marginLeft: '200px',
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
  },
  card: {
    padding: "10px",
    margin: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontSize: "1em",
  },
  loginButton: {
    width: "200px",
    padding: "15px",
    fontSize: "1.2em",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    margin: "10px auto",
    display: "block",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  loginButtonHover: {
    backgroundColor: "#0056b3",
    transform: "scale(1.05)",
  },
  loginButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
  },
};

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "google",
      });
      setProvider(web3authProvider);
      if (web3auth.connected) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed: ", error);
      alert("Login failed. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await web3auth.logout();
      setLoggedIn(false);
      setProvider(null);
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileContent />;
      case 'history':
        return <History />;
      case 'vote':
        return <VotePage />;
      case 'signature':
        return <Signature />;
      default:
        return <ProfileContent />;
    }
  };

  const unloggedInView = (
    <div style={styles.loginButtonContainer}>
      <Home />
      <button
        onClick={login}
        style={styles.loginButton}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        Login
      </button>
    </div>
  );

  const loggedInView = (
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
            ...(activeTab === 'vote' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('vote')}
        >
          Vote
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
            ...(activeTab === 'signature' ? styles.buttonActive : {})
          }}
          onClick={() => setActiveTab('signature')}
        >
          Signature Verification
        </button>
        
        <button
          style={{
            ...styles.button,
            ...(activeTab === 'logout' ? styles.buttonActive : {})
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div style={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );

  return (
    <div style={styles.mainContent}>
      {loggedIn ? loggedInView : unloggedInView}
    </div>
  );
};

export default Dashboard;
