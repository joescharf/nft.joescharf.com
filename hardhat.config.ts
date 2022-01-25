import * as dotenv from 'dotenv'

import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@nomiclabs/hardhat-ethers'
import 'hardhat-deploy'

dotenv.config()

const polygonProjectID = process.env.INFURA_POLYGON_PROJECT_ID || ''
const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY || ''

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${polygonProjectID}`,
      accounts: [accountPrivateKey],
    },
    mainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${polygonProjectID}`,
      accounts: [accountPrivateKey],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || '',
      accounts: [accountPrivateKey],
    },
    iota: {
      url: 'https://evm.wasp.sc.iota.org',
      chainId: 1074,
      accounts: [accountPrivateKey],
      timeout: 60000,
    },
    iotadefi: {
      url: 'https://evm.wasp.sc.iota-defi.com',
      chainId: 1075,
      accounts: [accountPrivateKey],
      timeout: 60000,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    artifacts: './artifacts',
    cache: './cache',
    sources: './contracts',
    tests: './test',
    deploy: './scripts/deploy',
    deployments: './deployments',
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    seller: 1,
    buyer: 2,
  },
}

export default config
