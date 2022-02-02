import * as React from 'react'
import type { NetworkInfo } from 'lib/networks'

interface ContextInterface {
  networkInfo: NetworkInfo | null
  setNetworkInfo: (networkInfo: NetworkInfo) => void
  contextLoading: boolean
  setContextLoading: (loading: boolean) => void
  networkInfoChanged: boolean
  setNetworkInfoChanged: (changed: boolean) => void
}

export const NetworkContext = React.createContext<ContextInterface | null>(null)

export const NetworkProvider: React.FC = ({ children }) => {
  const [networkInfo, setNetworkInfo] = React.useState<NetworkInfo | null>(null)
  const [contextLoading, setContextLoading] = React.useState(true)
  const [networkInfoChanged, setNetworkInfoChanged] = React.useState(false)

  return (
    <NetworkContext.Provider
      value={{
        networkInfo,
        setNetworkInfo,
        contextLoading,
        setContextLoading,
        networkInfoChanged,
        setNetworkInfoChanged,
      }}
    >
      {children}
    </NetworkContext.Provider>
  )
}

export const NetworkConsumer = NetworkContext.Consumer
