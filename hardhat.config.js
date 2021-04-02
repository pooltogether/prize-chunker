const networks = require('./hardhat.networks')

require("@nomiclabs/hardhat-waffle");
require('hardhat-deploy')
require('hardhat-deploy-ethers')
require('hardhat-abi-exporter')
require('hardhat-dependency-compiler')

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED

const config = {
  solidity: {
    version: "0.6.12",
    settings:{
      optimizer: {
        enabled: optimizerEnabled,
        runs: 200
      },
      evmVersion: "istanbul"
    }
  },
  networks,
  gasReporter: {
    currency: 'CHF',
    gasPrice: 21,
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  namedAccounts: {
    deployer: {
      default: 0
    },
    dai: {
      137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    },
    maticDaiPrizeStrategy: {
      137: '0x07591c981e86dd361101ab088f0f21e9d5b371ab'
    }
  },
  mocha: {
    timeout: 30000
  },
  abiExporter: {
    path: './abis',
    clear: true,
    flat: true
  },
  dependencyCompiler: {
    paths: [
      '@pooltogether/pooltogether-contracts/contracts/test/ERC20Mintable.sol',
      '@pooltogether/pooltogether-contracts/contracts/prize-strategy/PeriodicPrizeStrategy.sol'
    ],
  }
};

module.exports = config
