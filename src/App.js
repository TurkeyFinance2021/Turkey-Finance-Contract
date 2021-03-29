import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from 'react';

import { MetaMaskButton, Flex, Box, EthAddress, Loader, Select, Field, Input, Icon } from 'rimble-ui';
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import Web3 from 'web3';


import TURKEYToken from './abi/TURKEYToken.json'
import MasterChefV2 from './abi/MasterChefV2.json'
import LPToken from './abi/LPToken.json'



var BigNumber = require('big-number');


const App = () => {

  const [deployed, setDeployed] = useState(false);

  const [TURKEYTokenAddress,setTURKEYTokenAddress] = useState()
  const [masterChefV2Address,setMasterChefV2Address] = useState()
  const [lpTokenAddress,setlpTokenAddress] = useState()

  const [pendingTURKEYBalances,setPendingTURKEYBalances] = useState();



  const [TURKEY,setTURKEY] = useState();
  const [MASTERCHEFV2,setMASTERCHEFV2] = useState();
  const [LP,setLP] = useState();

  


  const [TURKEYTokenbalance, setTURKEYTokenbalances] = useState(0);
  const decimals = 1000000000000000000;
  const [currentSymbol, setcurrentSymbol] = useState("ASSET");
  const [depositedTURKEYToken, setdepositedTURKEYToken] = useState(0);
  const [depositedETH, setdepositedETH] = useState(0);
  const [currentNetworkID, setcurrentNetworkID] = useState();
  const [account, setAccount] = useState();
  const [Factor, setFactor] = useState();
  const [assetBalance, setAssetBalance] = useState();
  const [ableToClaim, setAbleToClaim] = useState(0);
  const [ignoreE59, setIgnoreE59] = useState(10000000000000000000000000000000000000000000000000000000000000000)

  const [poolInfo,setPoolInfo] = useState();
  const [addPoolFunction,setAddPoolFunction] = useState();
  const [pendingTURKEYFunction,setPendingTURKEYFunction] = useState();
  const [depositLPFunction,setDepositLPFunction] = useState();
  
;




  useEffect(() => {
    ethEnabled();
  })


  const ethEnabled = async () => {

    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      await window.ethereum.enable();

      const web3js = await window.web3;
      const accounts = await web3js.eth.getAccounts();
      await setAccount(accounts[0]);
      if (account)
      {
       console.log("Account connected",account);
      }
 

      let balances = await web3js.eth.getBalance(accounts[0]);
      setAssetBalance((balances / decimals).toFixed(4));


      const networkID = await web3js.eth.net.getId();
      if (networkID) {
        await setcurrentNetworkID(networkID)
        console.log("Current Network ID", networkID)
        if (networkID === 97 || 56) {
          setcurrentSymbol("BNB")
        }
        else if (networkID === 1 || 3 || 4) {
          setcurrentSymbol("ETH")
        }

        if (currentSymbol) {
          await console.log(currentSymbol)
        }

      }



     

    

      const TURKEYTokenData = await TURKEYToken.networks[networkID];
      const masterChefV2Data = await MasterChefV2.networks[networkID];
      const lpTokenData = await LPToken.networks[networkID];
      






      if (web3js && !deployed ) {
        if (TURKEYToken) {

          //         TURKEYToken _cake,
          //         SyrupBar _syrup,
          //         LPToken _lptoken
          //         MasterChef _masterchef
          //         address _devaddr,
          //         uint256 _cakePerBlock,
          //         uint256 _startBlock

          const TURKEYToken = await new web3js.eth.Contract(TURKEYToken.abi, TURKEYTokenData.address);
          console.log("TURKEYToken", TURKEYToken)
          setTURKEYTokenAddress(TURKEYTokenData.address)

          await setTURKEY(TURKEYToken);

          if (MasterChefV2)
          {
            const masterChefV2 = await new web3js.eth.Contract(MasterChefV2.abi,masterChefV2Data.address);
            console.log("MasterChef",masterChefV2)
            setMasterChefV2Address(masterChefV2Data.address)
            await setMASTERCHEFV2(masterChefV2)

           


         
          }

          if (LPToken)
          {
            const lpToken = await new web3js.eth.Contract(LPToken.abi,lpTokenData.address);
            console.log("LP Token",LPToken)
            setlpTokenAddress(lpTokenData.address)
            await setLP(LPToken)
          }

         













          
         
          

          if (TURKEY)
          {
          await returnTokenBalances();

          if (account)
          {
            returnPendingTURKEY();
          }
        
          await setDeployed(true);
          }

          
          

          // Get function  balance Of Token,LP,Asset






        }
      }
    }

    return false;
  }

  const returnTokenBalances = async () => {
    if (TURKEY) {
      let gooseBalances = await TURKEY.methods.balanceOf(account).call();

      setTURKEYTokenbalances(gooseBalances / decimals)
      console.log("Balances", gooseBalances);

    }
  }


  const returnPendingTURKEY = async ()=> {
    const web3 = window.web3;
    if (MASTERCHEFV2)
    {
      const rendingTURKEY = await MASTERCHEFV2.methods.pendingTURKEY(0,account).call(); 
      const rendingTURKEY1 = await MASTERCHEFV2.methods.pendingTURKEY(1,account).call(); 
      if (rendingTURKEY1)
      {
        const convertRendingTURKEY = rendingTURKEY/decimals;
        const convertRendingTURKEY1 = rendingTURKEY1/decimals;
        const totalRendingTURKEY =convertRendingTURKEY + convertRendingTURKEY1;


      setPendingTURKEYBalances(totalRendingTURKEY)
      }

    }
  }





  return (


    <div className="App">
      Goose clone function test

      <div>
        Goose Address : {TURKEYTokenAddress}
      </div>

      <div>
        MasterChefV2 Address : {masterChefV2Address}
      </div>


      <div>
        LP Address: {lpTokenAddress}
      </div>



  



      <div>
        TURKEY balances:  {TURKEYTokenbalance}
      </div>

      <div>
        Pending TURKEY Rewards : {pendingTURKEYBalances}
      </div>

      
     





    </div>





  );
}

export default App;