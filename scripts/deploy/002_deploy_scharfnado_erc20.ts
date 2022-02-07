// Deploy a custom ERC20 token and a faucet that will dispense tokens.
// Eventually can use this token as the base currency for the NFT marketplace

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { CONTRACTS } from '../constants'

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, network, ethers } = hre

  if (network.name == 'mainnet') {
    console.log('Faucet cannot be deployed to mainnet')
    return
  }

  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  const signer = await ethers.provider.getSigner(deployer)

  // Deploy Scharfnado ERC20
  await deploy(CONTRACTS.scharfnadoERC20, {
    from: deployer,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  const scharfnadoDeployment = await deployments.get(CONTRACTS.scharfnadoERC20)
  const scharfnadoContract = await ethers.getContract(CONTRACTS.scharfnadoERC20)

  // Connect to ScharfnadoERC20 with deployer address
  const snado = await scharfnadoContract.connect(signer)

  // Deploy Faucuet
  await deploy(CONTRACTS.scharfnadoFaucet, {
    from: deployer,
    args: [scharfnadoDeployment.address],
    log: true,
    skipIfAlreadyDeployed: true,
  })

  const faucetDeployment = await deployments.get(CONTRACTS.scharfnadoFaucet)

  // Mint snado to faucet
  const snadoAmount = ethers.utils.parseEther('1000')
  await snado.mint(faucetDeployment.address, snadoAmount)
}

func.tags = [CONTRACTS.scharfnadoERC20, 'erc20']

export default func
