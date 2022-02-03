import { ethers } from 'ethers'

export type MarketItem = {
  itemId: string
  nftContract: string
  tokenId: string
  seller: string
  owner: string
  price: string
  sold: boolean
}

export type NetworkInfo = {
  network?: string
  chainId?: string
  chainName?: string
  symbol?: string
  decimals?: number
  rpcUrls?: string[]
  blockExplorerUrls?: string[]
  provider?: ethers.providers.Provider | ethers.Signer | undefined
  nftMarketABI?: any
  nftABI?: any
}
