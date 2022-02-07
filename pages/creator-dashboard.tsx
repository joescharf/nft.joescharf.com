import * as React from 'react'
import { NetworkContext } from 'context/networkContext'

import type { NextPage } from 'next'
import type { MarketItem } from 'lib/types'

import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'

const Home: NextPage = () => {
  const [nfts, setNfts] = React.useState<MarketItem[]>([])
  const [sold, setSold] = React.useState([])
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
    // Initialize the web3modal -> signer
    const web3Modal = new Web3Modal({
      network: networkInfo.network,
      cacheProvider: true,
    })
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    // Setup the contracts
    const tokenContract = new ethers.Contract(
      networkInfo.nftABI.address,
      networkInfo.nftABI.abi,
      networkInfo.provider
    )
    const marketContract = new ethers.Contract(
      networkInfo.nftMarketABI.address,
      networkInfo.nftMarketABI.abi,
      signer
    )
    const data = await marketContract.fetchItemsCreated()

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
          sold: i.sold,
          image: meta.data.image,
        }
        return item
      })
    )
    // Create filtered array of items that have been sold
    const soldItems = items.filter((i) => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoading(false)
  }

  if (!loading && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No assets created</h1>
  return (
    <div>
      <div className="p-4">
        <h2 className="py-2 text-2xl">Items Created</h2>
        <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {nfts.map((nft, i) => (
            <div key={i} className="overflow-hidden border shadow rounded-xl">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} {networkInfo.symbol}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4">
        {Boolean(sold.length) && (
          <div>
            <h2 className="py-2 text-2xl">Items sold</h2>
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 lg:grid-cols-4">
              {sold.map((nft, i) => (
                <div
                  key={i}
                  className="overflow-hidden border shadow rounded-xl"
                >
                  <img src={nft.image} className="rounded" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">
                      Price - {nft.price} {networkInfo.symbol}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
