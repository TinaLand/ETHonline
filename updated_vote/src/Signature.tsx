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

const Signature: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        // if (web3auth.connected) {
        //   setLoggedIn(true);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const uiConsole = (...args: any[]): void => {
    const el = document.querySelector("#console");
    if (el) {
      // Clear previous content
      el.innerHTML = '';
  
      // Create a new div for each argument
      args.forEach(arg => {
        const div = document.createElement('div');
        div.className = 'console-entry';
  
        // Check if the argument is null or undefined, and replace with an empty object
        const displayValue = arg === null || arg === undefined ? '{}' : JSON.stringify(arg, null, 2);
  
        div.textContent = displayValue;
        el.appendChild(div);
      });
  
      console.log(...args);
    }
  };
  


  const createSchema = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

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
      console.error("Error creating schema:", error);
      uiConsole({ error: "Schema creation failed", details: error.message });
    }
  };

  const createAttestation = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const ethereumRPC = new EthereumRPC(provider);
    const signClient = new SignClient(ethereumRPC.walletClient);
    uiConsole("Creating Attestation...");

    const address = await ethereumRPC.getAccount();
    const response = await signClient.createAttestation(address);
    uiConsole({ hash: response.txHash, attestationId: response.attestationId });
  };

  const fetchAccountAttestations = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const ethereumRPC = new EthereumRPC(provider);
    const signClient = new SignClient(ethereumRPC.walletClient);
    uiConsole("Fetching Attestation...");

    const address = await ethereumRPC.getAccount();
    const response = await signClient.fetchAccountAttestations(address);
    uiConsole(response);
  };

  const fetchSchemaListFromIndexService = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Schema List...");

    try {
      const response = await indexService.querySchemaList({ page: 1 });
      console.log(response)
      uiConsole({ success: true, total: response?.total, size: response?.size, schemaList: response.schemaList });
    } catch (error) {
    //   uiConsole({ success: false, message: "Failed to fetch schema list", error: error.message });
        uiConsole({ success: false, message: "Failed to fetch schema list"});

    }
  };

  const fetchSchemaFromIndexService = async (schemaId: string) => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Schema...");

    try {
      const response = await indexService.querySchema(schemaId);
      uiConsole({ success: true, schema: response.schema });
    } catch (error) {
    //   uiConsole({ success: false, message: "Failed to fetch schema", error: error.message });
      uiConsole({ success: false, message: "Failed to fetch schema" });

    }
  };

  const fetchAttestationListFromIndexService = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Attestation List...");

    try {
      const response = await indexServices.queryAttestationList({ page: 1 });
      console.log(response)
      uiConsole({ success: true, total:response?.total, size: response?.size, attestationList: response.attestationList });
    } catch (error) {
    //   uiConsole({ success: false, message: "Failed to fetch attestation list", error: error.message });
    uiConsole({ success: false, message: "Failed to fetch attestation list" });
    }
  };

  const fetchAttestationFromIndexService = async (attestationId: string) => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Attestation...");

    try {
      const response = await indexService.queryAttestation(attestationId);
      uiConsole({ success: true, attestation: response.attestation });
    } catch (error) {
    //   uiConsole({ success: false, message: "Failed to fetch attestation", error: error.message });
    uiConsole({ success: false, message: "Failed to fetch attestation" });

    }
  };

const loggedInView = (
    <>
      <div style={styles.buttonContainer}>
        {/* <button onClick={() => {
            createAttestation();
          }}  
          style={styles.card}>
          Create attestation
        </button> */}

        <button onClick={() => {
            fetchAccountAttestations();
          }}  
          style={styles.card}>
          Fetch attestations
        </button>


        {/* <button onClick={() => {
            createSchema();
          }}  
          style={styles.card}>
          Create schema
        </button> */}

        <button onClick={() => {
            fetchSchemaListFromIndexService();
          }}  
          style={styles.card}>
        Fetch Schema List From Index Service
        </button>

        <button onClick={() => {
            fetchSchemaFromIndexService();
          }}  
          style={styles.card}>
          Fetch Schema From Index Service
        </button>

        <button onClick={() => {
            fetchAttestationListFromIndexService();
          }}  
          style={styles.card}>
        Fetch Attestation List From Index Service
        </button>

        <button onClick={() => {
            fetchAttestationFromIndexService();
          }}  
          style={styles.card}>
        Fetch Attestation From Index Service
        </button>

      </div>
      {/* <Vote refreshCandidates={refreshCandidates} /> */}
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
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
