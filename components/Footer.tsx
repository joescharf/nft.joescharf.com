import * as React from 'react'
import { NetworkContext } from 'context/networkContext'

const environment = process.env.NODE_ENV || 'undefined'

export default function Footer(): React.ReactElement {
  const { networkInfo } = React.useContext(
    NetworkContext
  ) as React.ContextType<NetworkContext>

  return (
    <footer className="mt-5 border-t">
      <p className="mt-2">
        Scharfnado NFT Marketplace - Based on the excellent{' '}
        <a href="https://www.youtube.com/watch?v=GKJBEEXUha0" target={'_blank'}>
          NFT Marketplace Tutorial by Nader Dabit
        </a>
      </p>
      <p className="mt-2">
        <a
          href="https://github.com/joescharf/nft.joescharf.com"
          target={'_blank'}
        >
          Github repo
        </a>{' '}
        | Contact me on twitter:{' '}
        <a href="https://twitter.com/joescharf" target={'_blank'}>
          @joescharf
        </a>
      </p>
      <div className="mt-2 text-gray-400 border-t border-blue-300 ">
        <p>networkInfo.default: {networkInfo?.default}</p>
        <p>networkInfo.network: {networkInfo?.network}</p>
        <p>
          networkInfo.nftMarketABI.address: {networkInfo?.nftMarketABI?.address}
        </p>
        <p>networkInfo.nftABI.address: {networkInfo?.nftABI?.address}</p>
        <p>
          networkInfo.snadoFaucetABI.address:{' '}
          {networkInfo?.snadoFaucetABI?.address}
        </p>
        <p>environment: {environment}</p>
      </div>
    </footer>
  )
}
