import * as React from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {

  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="Wave">👋</span> Hey there!
        </div>

        <div className="bio">
        I am rafaelp a brazilian <span role="img" aria-label="Brazil">🇧🇷</span> entrepreneur and developer. Connect your Ethereum wallet to wave at me! <span role="img" aria-label="Playboy">😎</span>
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
