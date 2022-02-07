import * as React from 'react'
import { NetworkContext } from 'context/networkContext'

import type { NextPage } from 'next'
import type { MarketItem } from 'lib/types'

import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

const Home: NextPage = () => {
  const [nfts, setNfts] = React.useState<MarketItem[]>([])

  // set page loaded state
  const [loading, setLoading] = React.useState(true)

  // Get the network info from the context
  const {
    networkInfo,
    contextLoading,
    networkInfoChanged,
    setNetworkInfoChanged,
  } = React.useContext(NetworkContext) as React.ContextType<NetworkContext>

  // Wait for the context to load
  React.useEffect(() => {
    if (!contextLoading) {
      console.log('!contextLoading: loading NFTs')
      loadNFTs()
      setNetworkInfoChanged(false)
    }
  }, [contextLoading])

  // If the network info has changed, reload the NFTs
  React.useEffect(() => {
    if (!contextLoading && networkInfoChanged) {
      console.log('NetworkInfoChanged loading NFTs')
      loadNFTs()
      setNetworkInfoChanged(false)
    }
  }, [networkInfoChanged])

  async function loadNFTs(): Promise<void> {
    // Setup the contracts and fetch the nfts from marketContract
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
    console.log('Fetche market items: ', data)

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
          owner: i.buyer,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        }
        return item
      })
    )
    setNfts(items)
    setLoading(false)
  }

  async function buyNft(nft: MarketItem): Promise<void> {
    // Initialize the web3modal -> signer
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // Setup the contracts
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

  if (!loading && !nfts.length)
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
                  {nft.price} {networkInfo.symbol}
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
