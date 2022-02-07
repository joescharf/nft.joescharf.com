import * as React from 'react'
import { NetworkContext } from 'context/networkContext'
import type { NextPage } from 'next'

import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const SnadoFaucet: NextPage = () => {
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

  async function dispenseFaucet(): Promise<void> {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    /* next, create the item */
    console.log(
      'Dispensing from faucet, FaucetAddress: ',
      networkInfo.snadoFaucetABI.address
    )
    const contract = new ethers.Contract(
      networkInfo.snadoFaucetABI.address,
      networkInfo.snadoFaucetABI.abi,
      signer
    )
    const transaction = await contract.dispense()
    await transaction.wait()
    router.push('/')
  }

  if (contextLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="flex justify-center">
        <div className="flex flex-col w-1/2 pb-12">
          <button
            onClick={dispenseFaucet}
            className="p-4 mt-4 font-bold text-white bg-pink-500 rounded shadow-lg"
          >
            Dispense 1 SNADO from Faucet
          </button>
        </div>
      </div>
    )
  }
}

export default SnadoFaucet
