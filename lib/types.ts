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
  provider?: ethers.providers.Provider | ethers.Signer | undefined
  nftMarketAddress?: string
  nftAddress?: string
}
