// import React, { useState } from 'react';

// const Services: React.FC = () => {
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);

//   const handleLogin = async () => {
//     // Call your login function here
//     const web3authProvider = await web3auth.connect();
//     if (web3authProvider) {
//       setLoggedIn(true);
//     }
//   };

//   const handleLogout = async () => {
//     await web3auth.logout();
//     setLoggedIn(false);
//   };

//   return (
//     <div>
//       {!loggedIn ? (
//         <div>
//           <h2>Login to Vote</h2>
//           <button onClick={handleLogin} className="card">
//             Login
//           </button>
//         </div>
//       ) : (
//         <div>
//           <h2>Services</h2>
//           <div className="button-container">
//             <button onClick={getUserInfo} className="card">
//               Get User Info
//             </button>
//             <button onClick={getAccounts} className="card">
//               Get Accounts
//             </button>
//             <button onClick={getBalance} className="card">
//               Get Balance
//             </button>
//             <button onClick={signMessage} className="card">
//               Sign Message
//             </button>
//             <button onClick={sendTransaction} className="card">
//               Send Transaction
//             </button>
//             <button onClick={handleLogout} className="card">
//               Log Out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Services;


import React, { useEffect, useState } from "react";
import "./App.css";
import Header from './Header';
import Footer from './Footer';
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import RPC from "./ethersRPC";

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
      <h2>Vote</h2>
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
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    uiConsole(user);
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
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const refreshCandidates = (candidateId: number) => {
    console.log(`Voted for candidate ${candidateId}`);
    // Implement your logic to handle the voting result
  };

  const loggedInView = (
    <>
      <div className="button-container">
        <button onClick={getUserInfo} className="card">
          Get User Info
        </button>
        <button onClick={getAccounts} className="card">
          Get Accounts
        </button>
        <button onClick={getBalance} className="card">
          Get Balance
        </button>
        <button onClick={signMessage} className="card">
          Sign Message
        </button>
        <button onClick={sendTransaction} className="card">
          Send Transaction
        </button>
        <button onClick={logout} className="card">
          Log Out
        </button>
      </div>
      <Vote refreshCandidates={refreshCandidates} />
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );
  

  const unloggedInView = (
    <button onClick={login} className="card">
      Login
    </button>
  );

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        {loggedIn ? loggedInView : unloggedInView}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Services;
