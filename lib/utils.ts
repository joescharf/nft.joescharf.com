import { ethers } from 'ethers'

// Import ABIs
import Market from 'deployments/mumbai/NFTMarket.json'
import NFT from 'deployments/mumbai/NFT.json'
import type { NetworkInfo } from 'lib/types'

// Load env vars
const network = process.env.NEXT_PUBLIC_NETWORK || ''

// Default hardhat network
let HardhatNFTMarketAddress =
  process.env.NEXT_PUBLIC_HARDHAT_NFT_MARKET_ADDRESS || ''
let HardhatNFTAddress = process.env.NEXT_PUBLIC_HARDHAT_NFT_ADDRESS || ''

// Mumbai network
const MumbaiNFTMarketAddress =
  process.env.NEXT_PUBLIC_MUMBAI_NFT_MARKET_ADDRESS || ''
const MumbaiNFTAddress = process.env.NEXT_PUBLIC_MUMBAI_NFT_ADDRESS || ''

export function SetNetwork(): NetworkInfo {
  let ret: NetworkInfo = {}
  switch (network) {
    case 'mumbai':
      ret.network = 'mumbai'
      ret.provider = new ethers.providers.JsonRpcProvider(
        'https://rpc-mumbai.maticvigil.com'
      )
      ret.nftMarketAddress = MumbaiNFTMarketAddress
      ret.nftAddress = MumbaiNFTAddress
      break
    default:
      ret.network = 'hardhat'
      ret.provider = new ethers.providers.JsonRpcProvider()
      ret.nftMarketAddress = HardhatNFTMarketAddress
      ret.nftAddress = HardhatNFTAddress
  }
  return ret
}
