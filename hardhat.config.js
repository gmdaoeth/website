/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: {
    version: "0.8.2",
    hardhat: {
      chainId: 1337,
    },
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
  networks: {
     ropsten: {
       url: process.env.ROPSTEN_ENDPOINT,
       accounts: [process.env.ROPSTEN_PRIVATE_KEY],
     },
     hardhat: {
       gasPrice: 50000000000 // in wei; in gwei it's the 1st two digits
     }
   },
  mocha: {
    timeout: 200000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
