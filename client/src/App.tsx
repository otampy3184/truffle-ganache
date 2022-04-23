import React, { VFC, useState, useEffect } from "react";
import { ethers } from "ethers";
import artifact from "../artifact/ERC20.json"
import detectEthereumProvider from '@metamask/detect-provider';

const contractAddress = "0x84F24347294cAefb6CA9d2213Ebb23fB8fFad4a0";

function App() {
  
    const enable = async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        console.log('Welcome to MetaMask User🎉');
      } else {
        console.log('Please Install MetaMask🙇‍♂️')
      }
    }
  
    enable();
  
    return (
      <div className="App">
        
      </div>
    );
  }
  
  export default App;