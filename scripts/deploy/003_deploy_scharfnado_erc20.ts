import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { CONTRACTS } from '../constants'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()

  await deploy(CONTRACTS.scharfnadoERC20, {
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
  })
}

func.tags = [CONTRACTS.scharfnadoERC20, 'erc20']

export default func
