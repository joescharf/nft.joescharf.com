import * as React from 'react'
import { NetworkContext } from 'context/networkContext'
import type { NextPage } from 'next'

import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

// IPFS Client
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const CreateItem: NextPage = () => {
  const [fileUrl, setFileUrl] = React.useState<string | null>(null)
  const [formInput, updateFormInput] = React.useState({
    price: '',
    name: '',
    description: '',
  })
  const router = useRouter()

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
      console.log('!contextLoading')
      setNetworkInfoChanged(false)
    }
  }, [contextLoading])

  // If the network info has changed, reload the NFTs
  React.useEffect(() => {
    if (!contextLoading && networkInfoChanged) {
      console.log('NetworkInfoChanged')
      setNetworkInfoChanged(false)
    }
  }, [networkInfoChanged])

  async function onChange(e): Promise<void> {
    const file = e.target.files[0]
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createSale(url: string): Promise<void> {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    console.log('Creating sale, nftAddress: ', networkInfo.nftABI.address)
    let contract = new ethers.Contract(
      networkInfo.nftABI.address,
      networkInfo.nftABI.abi,
      signer
    )
    let transaction = await contract.createToken(url)
    const tx = await transaction.wait()
    const event = tx.events[0]
    const value = event.args[2]
    const tokenId = value.toNumber()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')

    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(
      networkInfo.nftMarketABI.address,
      networkInfo.nftMarketABI.abi,
      signer
    )
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(
      networkInfo.nftABI.address,
      tokenId,
      price,
      {
        value: listingPrice,
      }
    )
    await transaction.wait()
    router.push('/')
  }

  async function createItem(): Promise<void> {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  if (contextLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 pb-12">
          <input
            placeholder="Asset Name"
            className="p-4 mt-8 border rounded"
            onChange={(e) =>
              updateFormInput({ ...formInput, name: e.target.value })
            }
          />
          <textarea
            placeholder="Asset Description"
            className="p-4 mt-2 border rounded"
            onChange={(e) =>
              updateFormInput({ ...formInput, description: e.target.value })
            }
          />
          <input
            placeholder={`Asset Price in ${networkInfo.symbol}`}
            className="p-4 mt-2 border rounded"
            onChange={(e) =>
              updateFormInput({ ...formInput, price: e.target.value })
            }
          />
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
          />
          {fileUrl && (
            <img className="mt-4 rounded" width="350" src={fileUrl} />
          )}
          <button
            onClick={createItem}
            className="p-4 mt-4 font-bold text-white bg-pink-500 rounded shadow-lg"
          >
            Create Digital Asset
          </button>
        </div>
      </div>
    )
  }
}

export default CreateItem
