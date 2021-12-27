/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require("dotenv").config();
 require("@nomiclabs/hardhat-waffle");
 require("@nomiclabs/hardhat-etherscan");
 
 module.exports = {
   solidity: {
     version: "0.8.2",
     settings: {
       optimizer: {
         enabled: true,
         runs: 200,
         details: {
           yul: false,
         },
       },
     },
   },
   mocha: {
     timeout: 200000,
   },
 };