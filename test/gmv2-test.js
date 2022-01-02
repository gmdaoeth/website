const { expect } = require("chai");
const { beforeEach } = require("mocha");
const { waffle } = require("hardhat");
const { ethers } = require("hardhat");

let contract;
let fakeRaribleContract;
let fakeRaribleContractAddress;
let fakeERC1155Contract;
let owner;
let wallet1;
let wallet2;
let wallet3;
let wallet4;
let maxSupply = 899;
let maxNormalTokens = 836;
let maxSpecialTokens = 63;
let raribleTokenId = 706480;
let gmdaoaddress = '0xD18e205b41eEe3D208D3B10445DB95Ff02ba4acA';
let baseTokenURI = "https://gmdao.ai/metadata/"

async function deployAndSetup() {
  const GmV1MockContract = await hre.ethers.getContractFactory(
    "GmV1Mock",
    {}
  );
  const GmV2Contract = await hre.ethers.getContractFactory(
    "GmV2",
    {}
  );
  [owner, wallet1, wallet2, wallet3, wallet4] =
    await hre.ethers.getSigners();
    fakeRaribleContract = await GmV1MockContract.deploy();
    fakeRaribleContractAddress = fakeRaribleContract.address;
    fakeERC1155Contract = await GmV1MockContract.deploy();
  contract = await GmV2Contract.deploy(
    baseTokenURI,
    fakeRaribleContractAddress
  );
}

describe("GM v2", function () {
  describe("GM v1 contract basics", function () {
    beforeEach(async function () {
      await deployAndSetup();
    });

    it("gives deployer wallet 10 of each token", async function () {
      let balanceOfRaribleToken = await fakeRaribleContract.balanceOf(owner.address, 1);
      let balanceOfGmToken = await fakeRaribleContract.balanceOf(owner.address, 706480);
      expect(balanceOfRaribleToken.toNumber()).to.equal(10);
      expect(balanceOfGmToken.toNumber()).to.equal(10);
    });

    it("gives another wallet 0 of gm token", async function () {
      let balanceOfGmToken = await fakeRaribleContract.balanceOf(wallet1.address, 706480);
      expect(balanceOfGmToken.toNumber()).to.equal(0);
    });
  });

  describe("Gas usage statistics", function () {
    beforeEach(async function () {
      await deployAndSetup();
    });

    it("Should deploy with less than 0.1 ETH/~$180", async () => {
      const tx = contract.deployTransaction;
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      const gasPrice = tx.gasPrice; // in wei
      const gasCostInEth =
        (gasPrice.toNumber() * gasUsed.toNumber()) / 1000000000000000000;
      // gas used: 2555015
      // cost if gas price is 50 gwei
      expect(gasCostInEth).to.be.lessThan(0.15); 
    });

    it("Should estimate gas for transferring ERC-1155", async function () {
      await contract.toggleMigrationActive();
      const tx = await fakeRaribleContract.safeTransferFrom(owner.address, contract.address, raribleTokenId, 1, "0x00");
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      expect(gasUsed.toNumber()).to.be.lessThanOrEqual(91583); 
    });

    it("Should estimate gas for calling upgradeToken", async function () {
      await contract.toggleMigrationActive();
      await fakeRaribleContract.safeTransferFrom(owner.address, contract.address, raribleTokenId, 1, "0x00");
      const tx = await contract.upgradeToken();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      expect(gasUsed.toNumber()).to.be.lessThanOrEqual(104507);
    });

    it("Should estimate gas for calling upgradeBatch qty 5", async function () {
      await contract.toggleMigrationActive();
      const tx = await contract.upgradeBatch(5);
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      expect(gasUsed.toNumber()).to.be.lessThanOrEqual(206742);
    });

    it("Should estimate gas for calling upgradeSpecialToken", async function () {
      await contract.toggleMigrationActive();
      const tx = await contract.upgradeSpecialToken();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      expect(gasUsed.toNumber()).to.be.lessThanOrEqual(85272);
    });
  });

  describe("Deployment and contract basics", function () {
    beforeEach(async function () {
      await deployAndSetup();
    });

    it("has name and symbol", async function () {
      expect(await contract.name()).to.equal("gmDAO Token v2");
      expect(await contract.symbol()).to.equal("GMV2");
    });

    it("has correct max supply", async function () {
	    const number = await contract.maxSupply();
      expect(number.toNumber()).to.equal(maxSupply);
    });

	  it("has correct normal token supply", async function () {
      const number = await contract.maxNormalTokens();
      expect(number.toNumber()).to.equal(maxNormalTokens);
	  });

	  it("has correct special token supply", async function () {
      const number = await contract.maxSpecialTokens();
      expect(number.toNumber()).to.equal(maxSpecialTokens);
	  });

    it("is inactive for migration on deploy", async function () {
      const isActive = await contract.isMigrationActive();
      expect(isActive).to.equal(false);
    });

    it("has correct base uri", async function () {
      const baseURI = await contract.baseTokenURI();
      expect(baseURI).to.equal(baseTokenURI);
    });

    it("has correct erc 1155 address", async function () {
      const raribleAddress = await contract.raribleContractAddress();
      expect(raribleAddress).to.equal(fakeRaribleContractAddress);
    });
  });

  describe("Inactive contract", function () {
    beforeEach(async function () {
      await deployAndSetup();
    });

    it("can't call upgradeToken", async function () {
      await expect(contract.upgradeToken()).to.be.revertedWith(
        "NOT_ACTIVE"
      );
    });

    it("can't call onERC1155Received", async function () {
      await expect(fakeRaribleContract.safeTransferFrom(owner.address, contract.address, raribleTokenId, 1, "0x00"))
      .to.be.revertedWith("NOT_ACTIVE");
    });

    it("can't call onERC1155BatchReceived", async function () {
      await expect(fakeRaribleContract.safeBatchTransferFrom(owner.address, contract.address, [raribleTokenId], [3], "0x00"))
      .to.be.revertedWith("NOT_ACTIVE");
    });

    it("can call upgradeBatch", async function () {
      await contract.upgradeBatch(5);
      const tokens = await contract.getTotalTokenCount();
      expect(tokens.toNumber()).to.equal(5);
    });

    it("can call upgradeSpecialToken", async function () {
      await contract.upgradeSpecialToken();
      const tokens = await contract.getTotalTokenCount();
      expect(tokens.toNumber()).to.equal(1);
    });
  });

  describe("Admin functions", function () {
    beforeEach(async function () {
      await deployAndSetup();
    });

    it("allows only owner to call upgradeBatch", async function () {
      await expect(contract.connect(wallet1).upgradeBatch(5)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.upgradeBatch(5);
      const tokens = await contract.getTotalTokenCount();
      expect(tokens.toNumber()).to.equal(5);
    });

    it("allows only owner to call upgradeSpecialToken", async function () {
      await expect(contract.connect(wallet1).upgradeSpecialToken()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.upgradeSpecialToken();
      const specialTokens = await contract.getSpecialTokenCount();
      expect(specialTokens.toNumber()).to.equal(1);
    });

    it("allows only owner to transfer ownership", async function () {
      await expect(contract.connect(wallet1).transferOwnership(wallet1.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.transferOwnership(wallet1.address);
      expect(await contract.owner()).to.equal(wallet1.address);
    });

    it("allows only owner to setBaseURI", async function () {
      const newURI = "https://seriouscat.com/";
      await expect(contract.connect(wallet1).setBaseURI(newURI)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.setBaseURI(newURI);
      expect(await contract.baseTokenURI()).to.equal(newURI);
    });

    it("allows only owner to setRoyaltyPercent", async function () {
      const newPercent = 10;
      await expect(contract.connect(wallet1).setRoyaltyPercent(newPercent)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.setRoyaltyPercent(newPercent);
      expect(await contract.royaltyPercent()).to.equal(newPercent);
    });

    it("allows only owner to setRaribleContractAddress", async function () {
      const newAddress = '0xD18e205b41eEe3D208D3B10445DB95Ff02ba4acA';
      await expect(contract.connect(wallet1).setRaribleContractAddress(newAddress)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.setRaribleContractAddress(newAddress);
      expect(await contract.raribleContractAddress()).to.equal(newAddress);
    });

    it("allows only owner to setRaribleTokenId", async function () {
      const newId = 69420;
      await expect(contract.connect(wallet1).setRaribleTokenId(newId)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.setRaribleTokenId(newId);
      expect(await contract.raribleTokenId()).to.equal(newId);
    });

    it("allows only owner to toggleMigrationActive", async function () {
      await expect(contract.connect(wallet1).toggleMigrationActive()).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
      await contract.toggleMigrationActive();
      expect(await contract.isMigrationActive()).to.equal(true);
    });
  });

  describe("Royalties", function () {
    beforeEach(async function () {
      await deployAndSetup();
      await contract.toggleMigrationActive();
      await contract.upgradeBatch(3);
    });

    it("gets the correct royalty information for a sale", async function () {
      const salePriceInEth = 10;
      const expectedRoyaltyAmountInEth = 9;
      const royaltyInfo = await contract.royaltyInfo(0, salePriceInEth);
      expect(royaltyInfo.receiver).to.equal(gmdaoaddress);
      expect(royaltyInfo.royaltyAmount.toNumber()).to.equal(expectedRoyaltyAmountInEth);
    });

    it("doesn't return royalty info for a nonexistent token", async function () {
      await expect(contract.royaltyInfo(69, 420)).to.be.revertedWith(
        "NONEXISTENT_TOKEN"
      );
    });
  });

  describe("Transferring", function () {
    beforeEach(async function () {
      await deployAndSetup();
      await contract.toggleMigrationActive();
      for (const wallet of [wallet1, wallet2, wallet3]) {
        await fakeRaribleContract.connect(wallet).mintGm();
        await fakeRaribleContract.connect(wallet).mintOther();
      }
    });

    it("allows v1 holders to transfer their v1 token and correctly records it", async function () {
      [wallet1, wallet2, wallet3].forEach(async wallet => {
        await fakeRaribleContract.connect(wallet).safeTransferFrom(wallet.address, contract.address, raribleTokenId, 1, "0x00");
        const sentTokens = await contract.sentV1Tokens(wallet.address);
        expect(sentTokens.toNumber()).to.equal(1);
      });
    });

    it("doesn't allow v1 holders to transfer another token from the approved contract", async function () {
      await expect(fakeRaribleContract.connect(wallet1).safeTransferFrom(wallet1.address, contract.address, 1, 1, "0x00")).to.be.revertedWith(
        "ONLY_GM"
      );
    });
    
    it("allows v1 holders to transfer v1 tokens with safeBatchTransferFrom", async function () {
      await fakeRaribleContract.connect(wallet1).safeBatchTransferFrom(wallet1.address, contract.address, [raribleTokenId], [2], "0x00");
      const sentTokens = await contract.sentV1Tokens(wallet1.address);
      expect(sentTokens.toNumber()).to.equal(2);
    });

    it("doesn't allow v1 holders to transfer multiple types of tokens with safeBatchTransferFrom", async function () {
      await expect(fakeRaribleContract.connect(wallet1).safeBatchTransferFrom(wallet1.address, contract.address, [raribleTokenId, 1], [2, 2], "0x00")).to.be.revertedWith(
        "ONLY_GM"
      );
    });

    it("doesn't allow anyone to transfer ERC-1155s from another contract", async function () {
      await expect(fakeERC1155Contract.safeTransferFrom(owner.address, contract.address, raribleTokenId, 1, "0x00")).to.be.revertedWith(
        "WRONG_NFT_CONTRACT"
      );
      await expect(fakeERC1155Contract.safeBatchTransferFrom(owner.address, contract.address, [raribleTokenId, 1], [2, 2], "0x00")).to.be.revertedWith(
        "WRONG_NFT_CONTRACT"
      );
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      await deployAndSetup();
      await contract.toggleMigrationActive();
      for (const wallet of [wallet1, wallet2, wallet3, wallet4]) {
        await fakeRaribleContract.connect(wallet).mintGm();
        await fakeRaribleContract.connect(wallet).mintOther();
      }
      for (const wallet of [wallet1, wallet2, wallet3]) {
        await fakeRaribleContract.connect(wallet).safeTransferFrom(wallet.address, contract.address, raribleTokenId, 1, "0x00");
      }
    });
    
    it("allows v1 holders to mint v2 using upgradeToken", async function () {
      for (const wallet of [wallet1, wallet2, wallet3]) {
        await contract.connect(wallet).upgradeToken();
      }
      const normaltokens = await contract.getNormalTokenCount();
      const totalTokens = await contract.getTotalTokenCount();
      expect(normaltokens.toNumber()).to.equal(3);
      expect(totalTokens.toNumber()).to.equal(3);
    });

    it("doesn't allow v1 holders to mint v2 using upgradeToken if they haven't sent v1", async function () {
      await expect(contract.connect(wallet4).upgradeToken()).to.be.revertedWith(
        "NO_V1"
      );
    });
    
    it("doesn't allow more than the max amount of normal tokens to be minted", async function () {
      await fakeRaribleContract.connect(wallet4).safeTransferFrom(wallet4.address, contract.address, raribleTokenId, 1, "0x00");
      for (const wallet of [wallet1, wallet2, wallet3]) {
        await contract.connect(wallet).upgradeToken();
      }
      const normaltokens = await contract.getNormalTokenCount();
      const specialtokens = await contract.getSpecialTokenCount();
      const totalTokens = await contract.getTotalTokenCount();
      expect(normaltokens.toNumber()).to.equal(3);
      expect(specialtokens.toNumber()).to.equal(0);
      expect(totalTokens.toNumber()).to.equal(3);
      await contract.upgradeBatch(833);
      const newNormaltokens = await contract.getNormalTokenCount();
      const newTotalTokens = await contract.getTotalTokenCount();
      expect(newNormaltokens.toNumber()).to.equal(836);
      expect(newTotalTokens.toNumber()).to.equal(836);
      await expect(contract.connect(wallet4).upgradeToken()).to.be.revertedWith(
        "MAX_NORMAL_SUPPLY"
      );
      await expect(contract.upgradeBatch(1)).to.be.revertedWith(
        "MAX_NORMAL_SUPPLY"
      );
    });
    
    it("doesn't allow more than the max amount of special tokens to be minted", async function () {
      for (let i = 0; i < 10; i++) {
        await contract.upgradeSpecialToken();
      }
      const normaltokens = await contract.getNormalTokenCount();
      const specialtokens = await contract.getSpecialTokenCount();
      const totalTokens = await contract.getTotalTokenCount();
      expect(normaltokens.toNumber()).to.equal(0);
      expect(specialtokens.toNumber()).to.equal(10);
      expect(totalTokens.toNumber()).to.equal(10);
      for (let i = 0; i < 53; i++) {
        await contract.upgradeSpecialToken();
      }
      const newSpecialtokens = await contract.getSpecialTokenCount();
      const newTotalTokens = await contract.getTotalTokenCount();
      expect(newSpecialtokens.toNumber()).to.equal(63);
      expect(newTotalTokens.toNumber()).to.equal(63);
      await expect(contract.upgradeSpecialToken()).to.be.revertedWith(
        "MAX_SPECIAL_SUPPLY"
      );
    });
    
    it("doesn't allow more than the max supply of tokens to be minted", async function () {
      for (let i = 0; i < maxSpecialTokens; i++) {
        await contract.upgradeSpecialToken();
      }
      await contract.upgradeBatch(maxNormalTokens - 1);
      const normaltokens = await contract.getNormalTokenCount();
      const specialtokens = await contract.getSpecialTokenCount();
      const totalTokens = await contract.getTotalTokenCount();
      expect(normaltokens.toNumber()).to.equal(maxNormalTokens - 1);
      expect(specialtokens.toNumber()).to.equal(maxSpecialTokens);
      expect(totalTokens.toNumber()).to.equal(maxSupply - 1);
      await contract.connect(wallet1).upgradeToken();
      await expect(contract.connect(wallet2).upgradeToken()).to.be.revertedWith(
        "MAX_TOTAL_SUPPLY"
      );
    });
    
    // it("", async function () {});
    
    // it("", async function () {});
    
    // it("", async function () {});
    
    // it("", async function () {});
  });

  describe("Tokens", function () {
    beforeEach(async function () {
      await deployAndSetup();
      await contract.toggleMigrationActive();
      for (const wallet of [wallet1, wallet2, wallet3, wallet4]) {
        await fakeRaribleContract.connect(wallet).mintGm();
        await fakeRaribleContract.connect(wallet).mintOther();
        await fakeRaribleContract.connect(wallet).safeTransferFrom(wallet.address, contract.address, raribleTokenId, 1, "0x00");
      }
    });
    
    it("keeps track of token ids correctly", async function () {
      // mint 10 normal and 5 special
      await contract.upgradeBatch(10);
      for (let i = 0; i < 5; i++) {
        await contract.upgradeSpecialToken();
      }
      // expect total to be 15, next normal token id to be 10, next special token id to be 841
      const totalTokens = await contract.getTotalTokenCount();
      expect(totalTokens).to.equal(15);

      const tx = await contract.connect(wallet1).upgradeToken();
      const receipt = await tx.wait();
      const createdTokenId = receipt.events[0].args.tokenId;
      expect(createdTokenId).to.equal(10);

      const specialTx = await contract.upgradeSpecialToken();
      const specialReceipt = await specialTx.wait();
      const createdSpecialTokenId = specialReceipt.events[0].args.tokenId;
      expect(createdSpecialTokenId).to.equal(841);

      // mint 35 normal and 6 special
      await contract.upgradeBatch(35);
      for (let i = 0; i < 6; i++) {
        await contract.upgradeSpecialToken();
      }
      // expect total to be 58, next normal token id to be 46, next special token id to be 847
      const newTotalTokens = await contract.getTotalTokenCount();
      expect(newTotalTokens).to.equal(58);

      const newTx = await contract.connect(wallet2).upgradeToken();
      const newReceipt = await newTx.wait();
      const newCreatedTokenId = newReceipt.events[0].args.tokenId;
      expect(newCreatedTokenId).to.equal(46);

      const newSpecialTx = await contract.upgradeSpecialToken();
      const newSpecialReceipt = await newSpecialTx.wait();
      const newCreatedSpecialTokenId = newSpecialReceipt.events[0].args.tokenId;
      expect(newCreatedSpecialTokenId).to.equal(848);
    });
        
    it("displays the correct tokenURI", async function () {
      const tokenURI = 10;
      // tokens 0-9
      await contract.upgradeBatch(10);
      // token id 10
      await contract.connect(wallet1).upgradeToken();
      expect(await contract.tokenURI(tokenURI)).to.equal(`${baseTokenURI}${tokenURI}.json`);
    });
    
    it("doesn't display the tokenURI for an unminted token", async function () {
      await contract.upgradeBatch(10);
      await contract.connect(wallet1).upgradeToken();
      // try to get URI for 11
      await expect(contract.tokenURI(11)).to.be.revertedWith(
        "NONEXISTENT_TOKEN"
      );
    });
  });
});