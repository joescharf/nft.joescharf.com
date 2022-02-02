import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NetworkProvider } from 'context/networkContext'
import Nav from 'components/Nav'
import Footer from 'components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col h-screen">
      <NetworkProvider>
        <Nav></Nav>

        <main className="flex-grow">
          <Component {...pageProps} />
        </main>

        <Footer></Footer>
      </NetworkProvider>
    </div>
  )
}

export default MyApp
