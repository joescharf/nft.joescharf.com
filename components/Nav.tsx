import * as React from 'react'
import Link from 'next/link'
import Selector from 'components/Selector'
import { GetNetworks, GetNetwork, GetDefaultNetwork } from 'lib/networks'
import { NetworkContext } from 'context/networkContext'

// Retrieve network info
const networkOptions = GetNetworks()
const defaultNetwork = GetDefaultNetwork()

export default function Nav(): React.ReactElement {
  // Get the network info from the context
  const {
    networkInfo,
    setNetworkInfo,
    contextLoading,
    setContextLoading,
    setNetworkInfoChanged,
  } = React.useContext(NetworkContext) as React.ContextType<NetworkContext>

  // Set the network info from the context on page load
  React.useEffect(() => {
    // Wait for the context to load
    if (contextLoading) {
      const net = GetNetwork(defaultNetwork)
      setNetworkInfo(net)
      setContextLoading(false)
    }
  }, [contextLoading])

  async function checkAccounts(): Promise<void> {
    if (window.ethereum) {
      console.log('found window.ethereum')
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      console.log('accounts: ', accounts)
    }
  }

  async function addChain(): Promise<void> {
    // If the chainId is set in networkinfo:
    if (networkInfo.chainId) {
      if (window.ethereum) {
        console.log('found window.ethereum')
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: networkInfo.chainId,
              chainName: networkInfo.chainName,
              nativeCurrency: {
                name: networkInfo.symbol,
                symbol: networkInfo.symbol,
                decimals: networkInfo.decimals,
              },
              rpcUrls: networkInfo.rpcUrls,
              blockExplorerUrls: networkInfo.blockExplorerUrls,
            },
          ],
        })
      }
    }
  }

  if (contextLoading) {
    return <div>Loading...</div>
  } else {
    checkAccounts()

    return (
      <nav className="p-6 border-b">
        <div className="flex justify-between">
          <p className="text-4xl font-bold">Scharfnado NFT Marketplace</p>
          <div className="flex flex-col">
            <Selector
              options={networkOptions}
              label={'Network'}
              value={networkInfo.network}
              onChangeHandler={(option) => {
                setNetworkInfo(GetNetwork(option))
                setNetworkInfoChanged(true)
              }}
            ></Selector>
            {networkInfo.faucetURL && (
              <Link href={networkInfo.faucetURL}>
                <a className="text-xs text-blue-500" target="_blank">
                  Token Faucet
                </a>
              </Link>
            )}
            {networkInfo.chainId && (
              <button
                className="w-full px-12 py-2 text-xs font-bold text-white bg-pink-500 rounded"
                onClick={() => {
                  const res = addChain()
                  console.log(res)
                }}
              >
                Add Chain
              </button>
            )}
          </div>
        </div>
        <div className="flex">
          <Link href="/">
            <a className="mr-4 text-pink-500">Home</a>
          </Link>
          <Link href="/create-item">
            <a className="mr-6 text-pink-500">Sell Digital Asset</a>
          </Link>
          <Link href="/my-assets">
            <a className="mr-6 text-pink-500">My Digital Assets</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 text-pink-500">Creator Dashboard</a>
          </Link>
        </div>
      </nav>
    )
  }
}
