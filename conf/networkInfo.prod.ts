import { ethers } from 'ethers'

// Import ABIs

import MumbaiMarketABI from 'deployments/mumbai/NFTMarket.json'
import MumbaiNFTABI from 'deployments/mumbai/NFT.json'
import IotaDefiMarketABI from 'deployments/iotadefi/NFTMarket.json'
import IotaDefiNFTABI from 'deployments/iotadefi/NFT.json'

const networkInfo = {
  default: 'mumbai',
  networks: {
    mumbai: {
      network: 'mumbai',

      chainId: '0x13881',
      chainName: 'Mumbai-Polygon',
      symbol: 'MATIC',
      decimals: 18,
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],

      nftMarketABI: MumbaiMarketABI,
      nftABI: MumbaiNFTABI,
      provider: new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com'
      ),
      faucetUrl: 'https://faucet.polygon.technology/',
    },
    iotadefi: {
      network: 'iotadefi',

      chainId: '0x433',
      chainName: 'iota-defi.com',
      symbol: 'IDEFI',
      decimals: 18,
      rpcUrls: ['https://evm.wasp.sc.iota-defi.com'],
      blockExplorerUrls: [],

      nftMarketABI: IotaDefiMarketABI,
      nftABI: IotaDefiNFTABI,
      provider: new ethers.providers.JsonRpcProvider(
        'https://evm.wasp.sc.iota-defi.com'
      ),
    },
  },
}

export default networkInfo