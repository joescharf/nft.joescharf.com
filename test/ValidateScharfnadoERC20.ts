import { expect } from 'chai'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { CONTRACTS } from '../scripts/constants'

describe('scharfnadoERC20', function () {
  it('Should validate ScharfnadoERC20 created and minted', async function () {
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

  it('Should validate Faucet balance and dispense', async function () {
    // setup: fixture, namedAccounts, deployments, contract
    await deployments.fixture([
      CONTRACTS.scharfnadoERC20,
      CONTRACTS.scharfnadoFaucet,
    ])
    const { deployer, seller } = await getNamedAccounts()

    const faucetDeployment = await deployments.get(CONTRACTS.scharfnadoFaucet)

    const scharfnadoERC20Contract = await ethers.getContract(
      CONTRACTS.scharfnadoERC20
    )
    const faucetContract = await ethers.getContract(CONTRACTS.scharfnadoFaucet)

    ///////

    const amountMinted = ethers.utils.parseUnits('1000', 'ether')

    // get balance of faucet
    const faucetBalance = await scharfnadoERC20Contract.balanceOf(
      faucetDeployment.address
    )

    expect(faucetBalance.toString()).to.equal(amountMinted.toString())

    // dispense from faucet to seller
    const amountToDispense = ethers.utils.parseUnits('1', 'ether')

    const signer = await ethers.provider.getSigner(seller)

    const amountDispensed = await faucetContract.connect(signer).dispense()

    const sellerBalance = await scharfnadoERC20Contract
      .connect(deployer)
      .balanceOf(seller)

    expect(sellerBalance.toString()).to.equal(amountToDispense.toString())
  })
})
