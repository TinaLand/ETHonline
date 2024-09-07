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

const Vote: React.FC<{ refreshCandidates: (candidateId: number) => void }> = ({ refreshCandidates }) => {
  const [candidateId, setCandidateId] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const handleVote = () => {
    if (hasVoted) {
      alert('You have already voted! Your vote will not be counted again.');
      return;
    }

    if (candidateId) {
      refreshCandidates(parseInt(candidateId));
      setHasVoted(true);
      setCandidateId('');
    } else {
      alert('Please enter a candidate ID');
    }
  };

  return (
    <div>
      <input
        type="number"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        placeholder="Enter candidate ID"
      />
      <button onClick={handleVote} disabled={hasVoted}>
        Vote
      </button>
    </div>
  );
};

const Services: React.FC = () => {
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
    // const web3authProvider = await web3auth.connect();
    const web3authProvider = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "google",
    });
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
    // uiConsole(user.name);
    // uiConsole(user.email);
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const address = await RPC.getAccounts(provider);
    // uiConsole(address);
    const ethereumRPC = new EthereumRPC(provider!);
    const address = await ethereumRPC.getAccount();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const balance = await RPC.getBalance(provider);
    const ethereumRPC = new EthereumRPC(provider!);
    const balance = await ethereumRPC.fetchBalance();
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    // const signedMessage = await RPC.signMessage(provider);
    const ethereumRPC = new EthereumRPC(provider!);
    const signedMessage = await ethereumRPC.signMessage();
    uiConsole(signedMessage);  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const ethereumRPC = new EthereumRPC(provider!);
    uiConsole("Sending Transaction...");
    // const transactionReceipt = await RPC.sendTransaction(provider);
    // uiConsole(transactionReceipt);
    const hash = await ethereumRPC.sendTransaction();
    uiConsole(hash);
  };

  const createSchema = async () => {
    if (!provider) {
        uiConsole("Provider not initialized yet");
        return;
    }

    const ethereumRPC = new EthereumRPC(provider!);
    console.log("provider");
    console.log(provider);
    console.log("wallet client");
    console.log(ethereumRPC.walletClient);

    const signClient = new SignClient(ethereumRPC.walletClient);
    uiConsole("Creating Schema...");

    // Define your schema ID and schema data here
    const schemaId = "VoteAndDonationSchema"; // You might need to generate or provide this ID
    const schemaData = [
        { name: "user", type: "string" },
        { name: "candidate", type: "string" },
        { name: "donationAmount", type: "number" },
    ];

    try {
        // Call the createSchema method
        const response = await signClient.createSchema(schemaId, schemaData);

        // Log response and use uiConsole to display the result
        uiConsole({
            "schemaId": response.schemaId,
            "message": response.message,
        });
    } catch (error) {
        console.error("Error creating schema:", error);
        uiConsole({
            "error": "Schema creation failed",
            "details": error.message,
        });
    }
};


  const createAttestation = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const ethereumRPC = new EthereumRPC(provider!);
    console.log("provider")
    console.log(provider)
    console.log("wallet client")
    console.log(ethereumRPC.walletClient)
    const signClient = new SignClient(ethereumRPC.walletClient);
    uiConsole("Creating Attestation...");

    const address = await ethereumRPC.getAccount();
    console.log(address)
    const response = await signClient.createAttestation(address);

    uiConsole({
      "hash": response.txHash,
      "attestationId": response.attestationId,
    });
  };

  const fetchAccountAttestations = async () => {
    if (!provider) {
      uiConsole("Provider not initialized yet");
      return;
    }

    const ethereumRPC = new EthereumRPC(provider!);
    const signClient = new SignClient(ethereumRPC.walletClient);
    uiConsole("Fetching Attestation...");

    const address = await ethereumRPC.getAccount();
    const response = await signClient.fetchAccountAttestations(address);

    uiConsole(response);
  }

  const fetchSchemaListFromIndexService = async () => {
    if (!provider) {
        uiConsole("Provider not initialized yet");
        return;
    }

    const indexService = new IndexService('testnet');
    uiConsole("Fetching Schema List...");

    try {
        const response = await indexService.querySchemaList({ page: 1 });
        uiConsole({
            success: true,
            schemaList: response.schemaList,
        });
    } catch (error) {
        uiConsole({
            success: false,
            message: "Failed to fetch schema list",
            error: error.message,
        });
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
      uiConsole({
          success: true,
          schema: response.schema,
      });
  } catch (error) {
      uiConsole({
          success: false,
          message: "Failed to fetch schema",
          error: error.message,
      });
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
      const response = await indexService.queryAttestationList({ page: 1 });
      uiConsole({
          success: true,
          attestationList: response.attestationList,
      });
  } catch (error) {
      uiConsole({
          success: false,
          message: "Failed to fetch attestation list",
          error: error.message,
      });
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
      uiConsole({
          success: true,
          attestation: response.attestation,
      });
  } catch (error) {
      uiConsole({
          success: false,
          message: "Failed to fetch attestation",
          error: error.message,
      });
  }
};

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  // const refreshCandidates = (candidateId: number) => {
  //   console.log(`Voted for candidate ${candidateId}`);
  //   // Implement your logic to handle the voting result
  // };


  const [candidates, setCandidates] = useState([
    { id: 1, name: 'Candidate 1', votes: 10 },
    { id: 2, name: 'Candidate 2', votes: 20 },
    { id: 3, name: 'Candidate 3', votes: 5 }
]);
const [hasVoted, setHasVoted] = useState(false);

const refreshCandidates = (votedCandidateId) => {
    setCandidates((prevCandidates) => 
        prevCandidates.map((candidate) =>
            candidate.id === votedCandidateId
                ? { ...candidate, votes: candidate.votes + 1 }
                : candidate
        )
    );
    setHasVoted(true); // Ensure the user can't vote again
};

  const [showVote, setShowVote] = useState<boolean>(false); 
  const toggleVote = () => {
    setShowVote(true);
  };

  const hideVote = () => {
    setShowVote(false);
  }

  const loggedInView = (
    <>
      <div style={styles.buttonContainer}>
        <button onClick={() => {
            getUserInfo();
            hideVote(); 
          }}  
          style={styles.card}>
           
          Get User Info
        </button>
        <button onClick={() => {
            getAccounts();
            hideVote(); 
          }}  
          style={styles.card}>
          Get Accounts
        </button>


        <button onClick={() => {
            getBalance();
            hideVote(); 
          }}  
          style={styles.card}>
          Get Balance
        </button>

        <button onClick={() => {
            signMessage();
            hideVote(); 
          }}  
          style={styles.card}>

          Sign Message
        </button>

        <button onClick={() => {
            sendTransaction();
            hideVote(); 
          }}  
          style={styles.card}>

          Send Transaction
        </button>

        <button onClick={() => {
            createAttestation();
            hideVote(); 
          }}  
          style={styles.card}>
          Create attestation
        </button>

        <button onClick={() => {
            fetchAccountAttestations();
            hideVote(); 
          }}  
          style={styles.card}>
          Fetch attestations
        </button>


        <button onClick={() => {
            createSchema();
            hideVote(); 
          }}  
          style={styles.card}>
          Create schema
        </button>

        <button onClick={() => {
            fetchSchemaListFromIndexService();
            hideVote(); 
          }}  
          style={styles.card}>
        fetch Schema List From Index Service
        </button>

        <button onClick={() => {
            fetchSchemaFromIndexService();
            hideVote(); 
          }}  
          style={styles.card}>
          fetch Schema From Index Service
        </button>

        <button onClick={() => {
            fetchAttestationListFromIndexService();
            hideVote(); 
          }}  
          style={styles.card}>
        fetch Attestation List From Index Service
        </button>

        <button onClick={() => {
            fetchAttestationFromIndexService();
            hideVote(); 
          }}  
          style={styles.card}>
        fetch Attestation From Index Service
        </button>

        <button onClick={toggleVote} style={styles.card}>
        Vote
        </button>

        {showVote && 
          <>
            <Vote refreshCandidates={refreshCandidates} />
            <Candidates candidates={candidates} />
            <Donate
              recipientAddress="0x653FAceAECeAA5186d8e8835ba89f150C3CeC144" // Replace with actual recipient address
              // onSuccess={handleSuccess}
              // onError={handleError}
            />
          </>
        }

        <button onClick={logout} style={styles.card}>
          Log Out
        </button>
      </div>
      {/* <Vote refreshCandidates={refreshCandidates} /> */}
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  const unloggedInView = (
    <>
    <Home />
      <button onClick={login} style={{ ...styles.card, ...styles.loginButton }}>
        Login
      </button>

    {/* <div style={styles.loginContainer}>
      <img
        src="https://media.istockphoto.com/id/1252900502/vector/banner-set-of-election-ballot-box-with-a-combination-of-american-flag.jpg?s=612x612&w=0&k=20&c=NcGfnsznn9Ta1irfKS-hB3eCpxWhIqdAyfZP1UFp1Vo="
        alt="Voting Banner"
        style={styles.loginImage}
      />
      
      <button onClick={login} style={{ ...styles.card, ...styles.loginButton }}>
        Login
      </button>
    </div> */}
    </>

  );

  return (
    <div style={styles.appContainer}>
      <Header />
      <div style={styles.mainContent}>
        {loggedIn ? loggedInView : unloggedInView}
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    minHeight: "100vh",
  },
  mainContent: {
    flex: 1,
  },
  loginContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",  // Center the content vertically
    height: "80vh",
    gap: "20px",  // Add a gap between elements for closer alignment
  },
  loginImage: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "80%",  // Make the image bigger
    objectFit: "contain" as "contain",
  },
  loginButton: {
    marginTop: "0",  // Reduce the margin top to bring it closer to the image
    width: "200px",
    padding: "10px",
    fontSize: "1.2em",
  },
  buttonContainer: {
    marginTop: "20px",
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
};

export default Services;
