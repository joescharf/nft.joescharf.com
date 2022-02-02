import { ethers } from 'ethers'

// Import ABIs
import HardhatMarketABI from 'deployments/localhost/NFTMarket.json'
import HardhatNFTABI from 'deployments/localhost/NFT.json'
import MumbaiMarketABI from 'deployments/mumbai/NFTMarket.json'
import MumbaiNFTABI from 'deployments/mumbai/NFT.json'
import IotaDefiMarketABI from 'deployments/iotadefi/NFTMarket.json'
import IotaDefiNFTABI from 'deployments/iotadefi/NFT.json'

import type { NetworkInfo } from 'lib/types'

let networkInfo: typeof NetworkInfo
if (process.env.NODE_ENV === 'production') {
  networkInfo = require('conf/networkInfo.prod').default
} else {
  networkInfo = require('conf/networkInfo.dev').default
}
export { networkInfo }

export function GetNetworks(): NetworkInfo {
  // return the keys of networkInfo
  return Object.keys(networkInfo.networks)
}

export function GetDefaultNetwork(): string {
  return networkInfo.default
}

export function GetNetwork(net: string): NetworkInfo {
  if (networkInfo.networks.hasOwnProperty(net)) {
    return { default: networkInfo.default, ...networkInfo.networks[net] }
  } else {
    return {}
  }
}
