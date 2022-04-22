import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import ERC20 from './contracts/ERC20.json';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select, MenuItem } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@material-ui/core/TextField';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import './App.css';

/**
 * 格闘中・・・・・・
 */

const Decimals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

/**
 * MyTokenコンポーネント
 */

const App = () => {
  // ステート変数を用意
  const [ state, setState ] = useState({ web3: null, accounts: null, contract: null  });
  const [name, setName] = useState(null);
  const [symbol, setSymbol] = useState(null);
  const [decimal, setDecimal] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [netID, setNetID] = useState(null);
  const [ethWeb3, setEthWeb3] = useState(null);
  // スタイル用のクラス
  const classes = useStyles();

  /**
   * useEffect関数 
   */
  useEffect(() => {
    init();
  }, []);

  /**
   * init関数
   */
   const init = async (isMounted) => {
    try {
      // 変数を設定
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      // デプロイ済みネットワークを取得する。
      const deployedNetwork = ERC20.networks[networkId];
      // コントラクトのインスタンスを生成する。
      const instance = new web3.eth.Contract (ERC20.abi, deployedNetwork && deployedNetwork.address);
      // ステート変数を設定する。
      if (isMounted) { 
        setState ({ web3, accounts, contract: instance });
      }
    } catch (error) {
      // アラートを出す。
      alert (`App.js: Failed to load web3, accounts, or contract. Check console for details.`,);
      // アラート内容を出力する。
      console.error (error);
    }
  } 

  /**
   * buttonDeploy関数
   */
  const buttonDeploy = async () => {
    try {
      // コントラクトをデプロイする。
      await contract.methods._mint(name, symbol)
      alert("MyTokenコントラクトデプロイ成功");
    } catch (e) {
      alert("MyTokenコントラクトデプロイ失敗");
      console.error(e);
    }
  }
  return (
    <div className="App">
      <h2>
        ERC20トークン作成画面
      </h2>
      <TextField
        id="name"
        className={classes.textField}
        placeholder="Token Name"
        margin="normal"
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
        required={true}
      />
      <TextField
        id="symbol"
        className={classes.textField}
        placeholder="Token Symbol"
        margin="normal"
        onChange={(e) => setSymbol(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
        required={true}
      />
      <br />
      <Button onClick={buttonDeploy} variant="contained" color="primary" className={classes.button}>
        ERC20トークンデプロイ
      </Button>
    </div>
  );
};

export default App;
