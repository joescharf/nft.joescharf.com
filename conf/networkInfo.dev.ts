import { ethers } from 'ethers'

// Import ABIs
import HardhatMarketABI from 'deployments/localhost/NFTMarket.json'
import HardhatNFTABI from 'deployments/localhost/NFT.json'
import HardhatSnadoFaucetABI from 'deployments/localhost/ScharfnadoFaucet.json'
import MumbaiMarketABI from 'deployments/mumbai/NFTMarket.json'
import MumbaiNFTABI from 'deployments/mumbai/NFT.json'
import MumbaiSnadoFaucetABI from 'deployments/mumbai/ScharfnadoFaucet.json'
import IotaDefiMarketABI from 'deployments/iotadefi/NFTMarket.json'
import IotaDefiNFTABI from 'deployments/iotadefi/NFT.json'
import IotaDefiSnadoFaucetABI from 'deployments/iotadefi/ScharfnadoFaucet.json'

const networkInfo = {
  default: 'hardhat',
  networks: {
    hardhat: {
      network: 'hardhat',

      symbol: 'HHAT',

      // ABIs
      nftMarketABI: HardhatMarketABI,
      nftABI: HardhatNFTABI,
      snadoFaucetABI: HardhatSnadoFaucetABI,
      provider: new ethers.providers.JsonRpcProvider(),
    },
    mumbai: {
      network: 'mumbai',

      // Network config
      chainId: '0x13881',
      chainName: 'Mumbai-Polygon',
      symbol: 'MATIC',
      decimals: 18,
      rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],

      // ABIs
      nftMarketABI: MumbaiMarketABI,
      nftABI: MumbaiNFTABI,
      snadoFaucetABI: MumbaiSnadoFaucetABI,

      // Provider instance
      provider: new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com'
      ),
      faucetURL: 'https://faucet.polygon.technology/',
    },
    iotadefi: {
      network: 'iotadefi',

      // Network config
      chainId: '0x433',
      chainName: 'iota-defi.com',
      symbol: 'ETH',
      decimals: 18,
      rpcUrls: ['https://evm.wasp.sc.iota-defi.com'],

      // ABIs
      nftMarketABI: IotaDefiMarketABI,
      nftABI: IotaDefiNFTABI,
      snadoFaucetABI: IotaDefiSnadoFaucetABI,

      // Provider instance
      provider: new ethers.providers.JsonRpcProvider(
        'https://evm.wasp.sc.iota-defi.com'
      ),
    },
  },
}

export default networkInfo
