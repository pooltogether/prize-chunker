module.exports = async (hardhat) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hardhat
  const { deploy } = deployments

  const harnessDisabled = !!process.env.DISABLE_HARNESS

  let {
    deployer,
    dai,
    maticDaiPrizeStrategy
  } = await getNamedAccounts()
  const chainId = parseInt(await getChainId(), 10)
  // 31337 is unit testing, 1337 is for coverage
  const isTestEnvironment = chainId === 31337 || chainId === 1337
  const isMatic = chainId === 137

  if (isTestEnvironment) {
    await deploy('Token', {
      contract: 'ERC20Mintable',
      args: [
        "TOKEN",
        "tok"
      ],
      from: deployer
    })
  }

  if (isMatic) {
    await deploy("DaiPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        dai,
        ethers.utils.parseEther('482.14285714285717'),
        maticDaiPrizeStrategy
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })
  }
}
