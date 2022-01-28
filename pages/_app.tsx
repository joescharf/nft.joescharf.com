import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { SetNetwork } from 'lib/utils'

function MyApp({ Component, pageProps }: AppProps) {
  // Load the network info
  const networkInfo = SetNetwork()

  return (
    <div className="flex flex-col h-screen">
      <nav className="p-6 border-b">
        <p className="text-4xl font-bold">Scharfnado NFT Marketplace</p>
        <div className="flex mt-4">
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

      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <footer className="border-t">
        <p>
          Scharfnado NFT Marketplace - Based on the excellent{' '}
          <a href="https://www.youtube.com/watch?v=GKJBEEXUha0">
            NFT Tutorial by Nader Dabit
          </a>
        </p>
        <p>Network : {networkInfo.network}</p>
        <p>NFT Marketplace: {networkInfo.nftMarketABI.address}</p>
        <p>NFT Address : {networkInfo.nftABI.address}</p>
      </footer>
    </div>
  )
}

export default MyApp
