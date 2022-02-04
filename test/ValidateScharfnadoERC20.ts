import { expect } from 'chai'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { CONTRACTS } from '../scripts/constants'

describe('scharfnadoERC20', function () {
  it('Should validate ScharfnadoERC20 created and minted', async function () {
    // hardhat-deploy simplifications:
    await deployments.fixture([CONTRACTS.scharfnadoERC20])
    const { deployer, seller } = await getNamedAccounts()
    const scharfnadoERC20 = await ethers.getContract(CONTRACTS.scharfnadoERC20)

    const amountMinted = ethers.utils.parseUnits('1000000', 'ether')

    // get decimals of contract
    const decimals = await scharfnadoERC20.decimals()
    const decimalsStr = decimals.toString()

    // get balance of deployer
    const deployerBalance = await scharfnadoERC20.balanceOf(deployer)

    expect(deployerBalance.toString()).to.equal(amountMinted.toString())
  })
})
