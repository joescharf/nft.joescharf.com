import { ethers } from 'ethers'

// Import ABIs
import HardhatMarketABI from 'deployments/localhost/NFTMarket.json'
import HardhatNFTABI from 'deployments/localhost/NFT.json'
import MumbaiMarketABI from 'deployments/mumbai/NFTMarket.json'
import MumbaiNFTABI from 'deployments/mumbai/NFT.json'
import IotaDefiMarketABI from 'deployments/iotadefi/NFTMarket.json'
import IotaDefiNFTABI from 'deployments/iotadefi/NFT.json'

const networkInfo = {
  default: 'hardhat',
  networks: {
    hardhat: {
      network: 'hardhat',
      symbol: 'HHAT',
      nftMarketABI: HardhatMarketABI,
      nftABI: HardhatNFTABI,
      provider: new ethers.providers.JsonRpcProvider(),
    },
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
      faucetURL: 'https://faucet.polygon.technology/',
    },
    iotadefi: {
      network: 'iotadefi',

      chainId: '0x433',
      chainName: 'iota-defi.com',
      symbol: 'IDEFI',
      decimals: 18,
      rpcUrls: ['https://evm.wasp.sc.iota-defi.com'],

      nftMarketABI: IotaDefiMarketABI,
      nftABI: IotaDefiNFTABI,
      provider: new ethers.providers.JsonRpcProvider(
        'https://evm.wasp.sc.iota-defi.com'
      ),
    },
  },
}

export default networkInfo
