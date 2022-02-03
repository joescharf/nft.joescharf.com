// import { expect } from 'chai'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { CONTRACTS } from '../scripts/constants'

describe('ETHFaucet', function () {
  it('Should request funds from ETH Faucet', async function () {
    return

    // hardhat-deploy simplifications:
    await deployments.fixture([CONTRACTS.ethFaucet])
    const { deployer, seller } = await getNamedAccounts()
    const ethFaucet = await ethers.getContract(CONTRACTS.ethFaucet)

    const amountRequested = ethers.utils.parseUnits('1', 'ether')

    /* request funds from ETH Faucet */
    const ret = await ethFaucet.requestTokens(seller)
    console.log('ret: ', ret)
  })
})
