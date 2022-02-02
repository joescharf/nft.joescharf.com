import * as React from 'react'
import Link from 'next/link'
import Selector from 'components/Selector'
import { GetNetworks, GetNetwork, GetDefaultNetwork } from 'lib/networks'
import { NetworkContext } from 'context/networkContext'

// Retrieve network info
const networkOptions = GetNetworks()
const defaultNetwork = GetDefaultNetwork()

export default function Nav() {
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

  if (contextLoading) {
    return <div>Loading...</div>
  } else {
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
                <a className="text-sm text-blue-500" target="_blank">
                  Token Faucet
                </a>
              </Link>
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
