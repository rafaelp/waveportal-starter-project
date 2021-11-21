import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import WavePortal from "./utils/WavePortal.json"

export default function App() {
  /*
  * Just a state variable we use to store our user's public wallet.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalWavesMessage, setTotalWavesMessage] = useState("Checking waves...");
  const [buttonText, setButtonText] = useState("Wave at Me")

  const contractAddress = "0x85865876EF85cD13D442c4319aA649eAbAE0A72B";
  const contractABI = WavePortal.abi

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const getNumberOfWaves = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        setTotalWavesMessage(`I've got ${count} waves until now!!!`)
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = null;

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);
        setButtonText('Waiting the transaction to be confirmed...');

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setButtonText('Wave at Me Again!');

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        setTotalWavesMessage(`I've got ${count} waves until now!!!`)
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
    getNumberOfWaves();
  })


  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="Wave">👋</span> Hey there! {totalWavesMessage}
        </div>

        <div className="bio">
        I am rafaelp a brazilian <span role="img" aria-label="Brazil">🇧🇷</span> entrepreneur and developer. Connect your Ethereum wallet to wave at me! <span role="img" aria-label="Playboy">😎</span>
        </div>

        <button className="waveButton" onClick={wave}>
          {buttonText}
        </button>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
