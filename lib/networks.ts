/* eslint-disable @typescript-eslint/no-var-requires */
import type { NetworkInfo } from 'lib/types'

let networkInfo: typeof NetworkInfo
if (process.env.NODE_ENV === 'production') {
  networkInfo = require('conf/networkInfo.prod.ts').default
} else {
  networkInfo = require('conf/networkInfo.dev.ts').default
}
export { networkInfo }

export function GetNetworks(): NetworkInfo {
  // return the keys of networkInfo
  return Object.keys(networkInfo.networks)
}

export function GetDefaultNetwork(): string {
  return networkInfo.default
}

export function GetNetwork(net: string): NetworkInfo {
  if (Object.prototype.hasOwnProperty.call(networkInfo.networks, net)) {
    return { default: networkInfo.default, ...networkInfo.networks[net] }
  } else {
    return {}
  }
}
