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
    mask: {
      137: '0x2b9e7ccdf0f4e5b24757c1e1a80e311e34cb10c7'
    },
    maskPrizeStrategy: {
      137: '0xA4B640153B1ff00CF6f16b1CD549cDAe0CA086bf'
    },
    dai: {
      137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    },
    badger: {
      1: '0x3472A5A71965499acd81997a54BBA8D852C6E53d'
    },
    badgerPrizeStrategy: {
      1: '0xbE85339D8Cc7fDd6C949dA660a691d201A576876'
    },
    maticDaiPrizeStrategy: {
      137: '0x07591c981e86dd361101ab088f0f21e9d5b371ab'
    },
    geminiPrizeStrategy: {
      1: '0x821cF440654addD81493e1949F9ee078D65bb57f'
    },
    celo: {
      42220: '0x471EcE3750Da237f93B8E339c536989b8978a438'
    },
    cUSDPrizeStrategy: {
      42220: '0x56837090Bb659ee4E468aE22eb97E17CDF829F9F'
    },
    cEURPrizeStrategy: {
      42220: '0xc935142EEF56F2467e2BAA8D1821F6d9178320c7'
    },
    tcap: {
      1: '0x16c52CeeCE2ed57dAd87319D91B5e3637d50aFa4'
    },
    pool: {
      1: '0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e'
    },
    poolPoolPrizeStrategy: {
      1: '0x21E5E62e0B6B59155110cD36F3F6655FBbCF6424'
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY
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
