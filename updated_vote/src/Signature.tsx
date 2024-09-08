import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import { Web3Auth } from '@web3auth/modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import EthereumRPC from './ethereumRPC';
import SignClient from './signClient';
import { IndexService } from '@ethsign/sp-sdk';

// Constants
const CLIENT_ID = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
const CHAIN_CONFIG = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

// Initialize providers
const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig: CHAIN_CONFIG } });
const web3auth = new Web3Auth({
  clientId: CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
});

const openloginAdapter = new OpenloginAdapter();
web3auth.configureAdapter(openloginAdapter);

const Signature: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    init();
  }, []);

  const uiConsole = (...args: any[]): void => {
    const el = document.querySelector("#console");
    if (el) {
      el.innerHTML = ''; // Clear previous content

      args.forEach(arg => {
        const div = document.createElement('div');
        div.className = 'console-entry';
        div.textContent = arg === null || arg === undefined ? '{}' : JSON.stringify(arg, null, 2);
        el.appendChild(div);
      });

      console.log(...args);
    }
  };

  const handleProviderCheck = () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return false;
    }
    return true;
  };

  const createSchema = async () => {
    if (!handleProviderCheck()) return;

    const ethereumRPC = new EthereumRPC(provider);
    const signClient = new SignClient(ethereumRPC.walletClient);

    uiConsole("Creating Schema...");
    const schemaId = "VoteAndDonationSchema";
    const schemaData = [
      { name: "user", type: "string" },
      { name: "candidate", type: "string" },
      { name: "donationAmount", type: "number" },
    ];

    try {
      const response = await signClient.createSchema(schemaId, schemaData);
      uiConsole({ schemaId: response.schemaId, message: response.message });
    } catch (error) {
      uiConsole({ error: "Schema creation failed", details: error.message });
    }
  };

  const createAttestation = async () => {
    if (!handleProviderCheck()) return;

    const ethereumRPC = new EthereumRPC(provider);
    const signClient = new SignClient(ethereumRPC.walletClient);

    uiConsole("Creating Attestation...");
    try {
      const address = await ethereumRPC.getAccount();
      const response = await signClient.createAttestation(address);
      uiConsole({ hash: response.txHash, attestationId: response.attestationId });
    } catch (error) {
      uiConsole({ error: "Attestation creation failed", details: error.message });
    }
  };

  const fetchAccountAttestations = async () => {
    if (!handleProviderCheck()) return;

    const ethereumRPC = new EthereumRPC(provider);
    const signClient = new SignClient(ethereumRPC.walletClient);

    uiConsole("Fetching Attestation...");
    try {
      const address = await ethereumRPC.getAccount();
      const response = await signClient.fetchAccountAttestations(address);
      uiConsole(response);
    } catch (error) {
      uiConsole({ error: "Failed to fetch attestations", details: error.message });
    }
  };

  const fetchSchemaListFromIndexService = async () => {
    if (!handleProviderCheck()) return;

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Schema List...");

    try {
      const response = await indexService.querySchemaList({ page: 1 });
      uiConsole({ success: true, total: response?.total, size: response?.size, schemaList: response.schemaList });
    } catch (error) {
      uiConsole({ success: false, message: "Failed to fetch schema list" });
    }
  };

  const fetchSchemaFromIndexService = async (schemaId: string) => {
    if (!handleProviderCheck()) return;

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Schema...");

    try {
      const response = await indexService.querySchema(schemaId);
      uiConsole({ success: true, schema: response.schema });
    } catch (error) {
      uiConsole({ success: false, message: "Failed to fetch schema" });
    }
  };

  const fetchAttestationListFromIndexService = async () => {
    if (!handleProviderCheck()) return;

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Attestation List...");

    try {
      const response = await indexService.queryAttestationList({ page: 1 });
      uiConsole({ success: true, total: response?.total, size: response?.size, attestationList: response.attestationList });
    } catch (error) {
      uiConsole({ success: false, message: "Failed to fetch attestation list" });
    }
  };

  const fetchAttestationFromIndexService = async (attestationId: string) => {
    if (!handleProviderCheck()) return;

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Attestation...");

    try {
      const response = await indexService.queryAttestation(attestationId);
      uiConsole({ success: true, attestation: response.attestation });
    } catch (error) {
      uiConsole({ success: false, message: "Failed to fetch attestation" });
    }
  };

  const loggedInView = (
    <>
      <div style={styles.buttonContainer}>
        <button onClick={fetchAccountAttestations} style={styles.button}>Fetch Attestations</button>
        <button onClick={fetchSchemaListFromIndexService} style={styles.button}>Fetch Schema List</button>
        <button onClick={fetchSchemaFromIndexService} style={styles.button}>Fetch Schema</button>
        <button onClick={fetchAttestationListFromIndexService} style={styles.button}>Fetch Attestation List</button>
        <button onClick={fetchAttestationFromIndexService} style={styles.button}>Fetch Attestation</button>
      </div>
      <div id="console" style={styles.console}></div>
    </>
  );

  return (
    <div style={styles.container}>
      <main>
        {loggedInView}
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row', // Change to row for horizontal layout
    flexWrap: 'wrap', // Allow wrapping if necessary
    justifyContent: 'center', // Center horizontally
    marginBottom: '20px',
  },
  button: {
    margin: '10px',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  console: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    maxHeight: '500px',
  },
  consoleEntry: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '4px',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
};

export default Signature;
