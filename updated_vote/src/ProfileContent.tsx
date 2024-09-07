import React, { useEffect, useState } from "react";
import Header from './Header';
import Footer from './Footer';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import RPC from "./ethersRPC";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import EthereumRPC from "./ethereumRPC";
import SignClient from "./signClient";
import { IndexService } from "@ethsign/sp-sdk";
import Candidates from "./Candidates";
import Donate from "./donate";
import Home from "./Home";

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

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

const ProfileContent: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    accountAddress: '',
    balance: '',
  });

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          await loadProfileData();
        }
      } catch (error) {
        console.error(error);
      }
    };

    const loadProfileData = async () => {
      try {
        const userInfo = await getUserInfo();
        const accountAddress = await getAccounts();
        const balance = await getBalance();

        setProfileData({
          name: userInfo?.name || 'N/A',
          email: userInfo?.email || 'N/A',
          accountAddress: accountAddress || 'N/A',
          balance: balance || 'N/A',
        });
      } catch (error) {
        console.error('Error loading profile data', error);
      }
    };

    init();
  }, []);

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    return user;
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const ethereumRPC = new EthereumRPC(provider!);
    const address = await ethereumRPC.getAccount();
    return address;
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const ethereumRPC = new EthereumRPC(provider!);
    const balance = await ethereumRPC.fetchBalance();
    return balance;
  };

  return (
    <div style={styles.container}>
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




// const ProfileContent: React.FC = () => {
//   return (
//     <div style={styles.container}>
//       {/* <h3 style={styles.heading}>Profile</h3> */}
//       <div style={styles.card}>
//         <div style={styles.cardContent}>
//           <div style={styles.field}>
//             <span style={styles.label}>Name:</span>
//             <span style={styles.value}>{profileData.name}</span>
//           </div>
//           <div style={styles.field}>
//             <span style={styles.label}>Email:</span>
//             <span style={styles.value}>{profileData.email}</span>
//           </div>
//           <div style={styles.field}>
//             <span style={styles.label}>Account Address:</span>
//             <span style={styles.value}>{profileData.accountAddress}</span>
//           </div>
//           <div style={styles.field}>
//             <span style={styles.label}>Balance:</span>
//             <span style={styles.value}>{profileData.balance}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
