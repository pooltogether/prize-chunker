const { expect } = require('chai')
const { deployMockContract } = require('ethereum-waffle')
const hardhat = require('hardhat')

const { deployments } = hardhat

const toWei = hardhat.ethers.utils.parseEther

describe('PrizeChunker', () => {

  let token, chunker, prizeStrategy, prizePool

  beforeEach(async () => {
    [wallet, wallet2, wallet3, wallet4] = await hardhat.ethers.getSigners()
    
    await deployments.fixture()

    prizePool = wallet2.address

    const PeriodicPrizeStrategy = await hardhat.artifacts.readArtifact('PeriodicPrizeStrategy')
    prizeStrategy = await deployMockContract(wallet, PeriodicPrizeStrategy.abi)
    await prizeStrategy.mock.prizePool.returns(prizePool)

    const PrizeChunkerFactory = await hardhat.ethers.getContractFactory('PrizeChunker', wallet)

    token = await hardhat.ethers.getContract('Token', wallet)

    chunker = await PrizeChunkerFactory.deploy(token.address, toWei('10'), prizeStrategy.address)
  })

  it('should work when no balance', async () => {
    await prizeStrategy.call(chunker, 'afterPrizePoolAwarded', 12, 99)
    expect(await token.balanceOf(prizePool)).to.equal(toWei('0'))
  })

  it('should work when excess balance', async () => {
    await token.mint(chunker.address, toWei('19'))
    await prizeStrategy.call(chunker, 'afterPrizePoolAwarded', 12, 99)
    expect(await token.balanceOf(prizePool)).to.equal(toWei('10'))
  })

  it('should work when insufficient balance', async () => {
    await token.mint(chunker.address, toWei('4'))
    await prizeStrategy.call(chunker, 'afterPrizePoolAwarded', 12, 99)
    expect(await token.balanceOf(prizePool)).to.equal(toWei('4'))
  })

})