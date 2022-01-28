import { ethers } from 'ethers'

// Import ABIs
import HardhatMarketABI from 'deployments/localhost/NFTMarket.json'
import HardhatNFTABI from 'deployments/localhost/NFT.json'
import MumbaiMarketABI from 'deployments/mumbai/NFTMarket.json'
import MumbaiNFTABI from 'deployments/mumbai/NFT.json'
import IotaDefiMarketABI from 'deployments/iotadefi/NFTMarket.json'
import IotaDefiNFTABI from 'deployments/iotadefi/NFT.json'

import type { NetworkInfo } from 'lib/types'

// Load env vars
const network = process.env.NEXT_PUBLIC_NETWORK || ''

export const networkInfo = {
  hardhat: {
    network: 'hardhat',
    nftMarketABI: HardhatMarketABI,
    nftABI: HardhatNFTABI,
    provider: new ethers.providers.JsonRpcProvider(),
  },
  mumbai: {
    network: 'mumbai',
    nftMarketABI: MumbaiMarketABI,
    nftABI: MumbaiNFTABI,
    provider: new ethers.providers.JsonRpcProvider(
      'https://rpc-mumbai.maticvigil.com'
    ),
  },
  iotadefi: {
    network: 'iotadefi',
    nftMarketABI: IotaDefiMarketABI,
    nftABI: IotaDefiNFTABI,
    provider: new ethers.providers.JsonRpcProvider(
      'https://evm.wasp.sc.iota.org'
    ),
  },
}

export function SetNetwork(): NetworkInfo {
  if (networkInfo.hasOwnProperty(network)) {
    return networkInfo[network]
  } else {
    return {}
  }
}
