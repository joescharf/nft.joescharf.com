import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { CONTRACTS } from '../constants'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  const marketDeployment = await deployments.get(CONTRACTS.market)

  await deploy(CONTRACTS.nft, {
    from: deployer,
    args: [marketDeployment.address],
    log: true,
    skipIfAlreadyDeployed: true,
  })
}

func.tags = [CONTRACTS.nft, 'nft']

export default func
