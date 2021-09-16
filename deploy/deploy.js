module.exports = async (hardhat) => {
  const { getNamedAccounts, deployments, getChainId, ethers } = hardhat
  const { deploy } = deployments

  const harnessDisabled = !!process.env.DISABLE_HARNESS

  let {
    celo,
    cUSDPrizeStrategy,
    cEURPrizeStrategy,
    deployer,
    dai,
    mask,
    maskPrizeStrategy,
    maticDaiPrizeStrategy,
    badger,
    badgerPrizeStrategy,
    geminiPrizeStrategy,
    tcap
  } = await getNamedAccounts()
  const chainId = parseInt(await getChainId(), 10)
  // 31337 is unit testing, 1337 is for coverage
  const isTestEnvironment = chainId === 31337 || chainId === 1337
  const isMatic = chainId === 137
  const isMainnet = chainId === 1
  const isCelo = chainId === 42220

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

    await deploy("MaskPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        mask,
        ethers.utils.parseEther('50'),
        maskPrizeStrategy
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })
  }

  if (isCelo && celo) {
    await deploy("cUSDCeloPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        celo,
        '1',
        cUSDPrizeStrategy
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })
    await deploy("cEURCeloPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        celo,
        '1',
        cEURPrizeStrategy
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })
  }

  if (isMainnet) {
    await deploy("BadgerPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        badger,
        ethers.utils.parseEther('200'),
        badgerPrizeStrategy        
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })

    await deploy("GeminiTcapPrizeChunker", {
      contract: "PrizeChunker",
      args: [
        tcap,
        ethers.utils.parseEther('1.5'),
        geminiPrizeStrategy        
      ],
      skipIfAlreadyDeployed: true,
      from: deployer
    })
  }
}
