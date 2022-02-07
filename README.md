# NFT Marketplace App


## Intro
This app is based on [Nader Dabit's](https://twitter.com/dabit3) excellent [How to Build a Full Stack NFT Marketplace with Polygon and Next.js](https://www.youtube.com/watch?v=GKJBEEXUha0) tutorial available from this [github repository](https://github.com/dabit3/polygon-ethereum-nextjs-marketplace/). 

I have used this tutorial to come up to speed and experiment with smart contracts and frontend web3 primitives. I've also added some additional features and updates.

My production deployment of this repo can be found at [Scharfnado NFT Marketplace](https://nft.joescharf.com).

If you find this helpful or have questions, get in touch with me on [Twitter](https://twitter.com/joescharf)

## New Features and Additions
* Typescript as much as possible
* [hardhat-deploy plugin](https://github.com/wighawag/hardhat-deploy) to simplify contract deployment and testing with [hardhat](https://hardhat.org/)
* Multi-chain capability - define your chains in `conf/networkInfo.*.ts`
* Network (chain) selector persisted in localstorage
* Ability to set listingPrice() on NFTMarket contract in case you can't find the faucet for a chain. (i.e. listingPrice(0))


## Overview
* `conf` - Network configurations for frontend
* `contracts` - Solidity contracts
* `deployments/<network>` - ABIs per network/chain
* `scripts/deploy` - Contract deployment scripts
* `test` - Contract tests
  
## Running Locally

```zsh
# 1. checkout repo and install dependencies
git clone ...
cd nft.joescharf.com
yarn install

# 2. Set configuration
## set .env required environment values (see .env.example)
## configure development and production networks in conf/networkInfo.*.ts

# 3. Deploy Contracts: 
## (optional) test the contracts:
yarn hardhat test

## Launch local hardhat network and deploy contracts
yarn hardhat node

# 4. Start Frontend: Launch nextJS dev server
yarn dev

# navigate to http://localhost:3000
```

---
## Solidity Contracts 
### Hardhat tasks

* `yarn hardhat node` - load hardhat rpc network and deploy contracts
* `yarn hardhat test [--network <network_name>` - run contract test scripts (--network specifies alt network)
* `yarn hardhat deploy --network <network_name> [--reset]` - Deploy contracts to specified network (--reset resets existing deployments)

### Networks:
* `hardhat` - Hardhat local network
* `mumbai` - Polygon Mumbai testnet
* `iotadefi` - iota-defi.com IOTA EVM

---
### Other info provided by hardhat install

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.ts
TS_NODE_FILES=true npx ts-node scripts/deploy.ts
npx eslint '**/*.{js,ts}'
npx eslint '**/*.{js,ts}' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```
### Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.example file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/sample-script.ts
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```

### Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
