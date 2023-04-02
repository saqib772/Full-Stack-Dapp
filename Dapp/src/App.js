import abi from "./contracts/Message.json";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Info from "./components/Info";

import Buy from "./components/Buy";

import './App.css';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");

  useEffect(() => {
    const connectwallet = async () => {
      const contractaddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contracrabi = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

          window.ethereum.on("chainChanged", (chainId) => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", (chainId) => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(window.ethereum);

          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractaddress, contracrabi, signer);
          setState({ provider, signer, contract });

        }
        else {
          alert("Please install Metamask");
        }


      }
      catch (error) {
        console.log(error);
      }
    };
    connectwallet();

  }, []);

  console.log(state);
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Info state={state}></Info>
        <Buy state={state}></Buy>
      </div>
    </div>


  );
}

export default App;
