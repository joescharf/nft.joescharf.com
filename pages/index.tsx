import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import type { MarketItem } from 'lib/types'
import { SetNetwork } from 'lib/utils'

import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

const Home: NextPage = () => {
  const [nfts, setNfts] = useState<MarketItem[]>([])
  const [loadingState, setLoadingState] = useState<string>('not-loaded')

  // Load the network info
  const networkInfo = SetNetwork()

  useEffect(() => {
    loadNFTs()
  }, [])

  async function loadNFTs() {
    const tokenContract = new ethers.Contract(
      networkInfo.nftABI.address,
      networkInfo.nftABI.abi,
      networkInfo.provider
    )
    const marketContract = new ethers.Contract(
      networkInfo.nftMarketABI.address,
      networkInfo.nftMarketABI.abi,
      networkInfo.provider
    )
    const data = await marketContract.fetchMarketItems()

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        const item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }
        return item
      })
    )
    setNfts(items)
    setLoadingState('loaded')
  }

  async function buyNft(nft: MarketItem) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = networkInfo.provider
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      networkInfo.nftMarketABI.address,
      networkInfo.nftMarketABI.abi,
      signer
    )

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(
      networkInfo.nftABI.address,
      nft.tokenId,
      {
        value: price,
      }
    )
    await transaction.wait()
    loadNFTs()
  }

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {nfts.map((nft, i) => (
            <div key={i} className="overflow-hidden border shadow rounded-xl">
              <img src={nft.image} />
              <div className="p-4">
                <p
                  style={{ height: '64px' }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: '70px', overflow: 'hidden' }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="mb-4 text-2xl font-bold text-white">
                  {nft.price} Matic
                </p>
                <button
                  className="w-full px-12 py-2 font-bold text-white bg-pink-500 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
