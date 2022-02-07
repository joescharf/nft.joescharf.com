import * as React from 'react'
import { NetworkContext } from 'context/networkContext'

const environment = process.env.NODE_ENV || 'undefined'

export default function Footer(): React.ReactElement {
  const { networkInfo } = React.useContext(
    NetworkContext
  ) as React.ContextType<NetworkContext>

  return (
    <footer className="border-t">
      <p>
        Scharfnado NFT Marketplace - Based on the excellent{' '}
        <a href="https://www.youtube.com/watch?v=GKJBEEXUha0">
          NFT Tutorial by Nader Dabit
        </a>
      </p>
      <p>(C)networkInfo.default: {networkInfo?.default}</p>
      <p>(C)networkInfo.network: {networkInfo?.network}</p>
      <p>
        (C)networkInfo.nftMarketABI.address:{' '}
        {networkInfo?.nftMarketABI?.address}
      </p>
      <p>(C)networkInfo.nftABI.address: {networkInfo?.nftABI?.address}</p>
      <p>
        (C)networkInfo.snadoFaucetABI.address:{' '}
        {networkInfo?.snadoFaucetABI?.address}
      </p>
      <p>Environment: {environment}</p>
    </footer>
  )
}
