import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { CONTRACTS } from '../constants'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network, ethers } = hre

  if (network.name !== 'iotadefi') {
    return
  }

  const { deployer } = await getNamedAccounts()
  const signer = await ethers.provider.getSigner(deployer)

  const marketContract = await ethers.getContract(CONTRACTS.market)
  const mkt = await marketContract.connect(signer)

  const ret = await mkt.setListingPrice(0)
  console.log('iotadefi: set listing price to 0: ', ret)
}

func.tags = ['iotadefi']
func.dependencies = [CONTRACTS.market]

export default func
