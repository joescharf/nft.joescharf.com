import { expect } from 'chai'
import { ethers, deployments, getNamedAccounts } from 'hardhat'
import { CONTRACTS } from '../scripts/constants'

describe('NFTMarket', function () {
  it('Should create and execute market sales', async function () {
    // /* deploy the marketplace */
    // const Market = await ethers.getContractFactory('NFTMarket')
    // const market = await Market.deploy()
    // await market.deployed()
    // const marketAddress = market.address

    // /* deploy the NFT contract */
    // const NFT = await ethers.getContractFactory('NFT')
    // const nft = await NFT.deploy(marketAddress)
    // await nft.deployed()
    // const nft.address = nft.address

    // hardhat-deploy simplifications:
    await deployments.fixture([CONTRACTS.market, CONTRACTS.nft])
    const { deployer, seller, buyer } = await getNamedAccounts()
    const market = await ethers.getContract(CONTRACTS.market)
    const nft = await ethers.getContract(CONTRACTS.nft)

    let listingPrice = await market.getListingPrice()
    const listingPriceStr = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    /* create two tokens */
    await nft.createToken('https://www.mytokenlocation.com')
    await nft.createToken('https://www.mytokenlocation2.com')

    /* put both tokens for sale */
    await market.createMarketItem(nft.address, 1, auctionPrice, {
      value: listingPriceStr,
    })
    await market.createMarketItem(nft.address, 2, auctionPrice, {
      value: listingPriceStr,
    })

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await market
      .connect(buyerAddress)
      .createMarketSale(nft.address, 1, { value: auctionPrice })

    /* query for and return the unsold items */
    let items = await market.fetchMarketItems()
    let items2 = await Promise.all(
      items.map(async (i: any) => {
        const tokenUri = await nft.tokenURI(i.tokenId)
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        }
        return item
      })
    )

    console.log('items: ', items2)
  })
})
