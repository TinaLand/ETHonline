import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK, WALLET_ADAPTERS } from '@web3auth/base';
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
        <button onClick={fetchAccountAttestations} style={styles.card}>Fetch Attestations</button>
        <button onClick={fetchSchemaListFromIndexService} style={styles.card}>Fetch Schema List From Index Service</button>
        <button onClick={fetchSchemaFromIndexService} style={styles.card}>Fetch Schema From Index Service</button>
        <button onClick={fetchAttestationListFromIndexService} style={styles.card}>Fetch Attestation List From Index Service</button>
        <button onClick={fetchAttestationFromIndexService} style={styles.card}>Fetch Attestation From Index Service</button>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}></div>
    </>
  );

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1>Vote and Donate</h1>
        {loggedInView}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  card: {
    margin: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'white',
    zIndex: 1,
  },
};

export default Signature;
