import { Valkyrie } from "../typechain-types";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

let deployer: SignerWithAddress, alice: SignerWithAddress, bob: SignerWithAddress, carol: SignerWithAddress, feeRecipient: SignerWithAddress;
let nft: Valkyrie;

const setupTest = async () => {
    const factory = await ethers.getContractFactory("Valkyrie");
    nft = await factory.deploy();
};

describe("SimpleMint", function () {
    before(async () => {
        [deployer, alice, bob, carol, feeRecipient] = await ethers.getSigners();
    });

    beforeEach(async () => {
        await setupTest();
    });

    it("init test", async () => {
        expect(await nft.name()).to.be.equal("Gaia Protocol Valkyrie");
        expect(await nft.symbol()).to.be.equal("VKR");
    });

    it("mint function test", async () => {
        expect(await nft.totalSupply()).to.be.equal(0);
        expect(await nft.balanceOf(deployer.address)).to.be.equal(0);

        await nft.mint(deployer.address);
        expect(await nft.totalSupply()).to.be.equal(1);
        expect(await nft.balanceOf(deployer.address)).to.be.equal(1);
        expect(await nft.ownerOf(0)).to.be.equal(deployer.address);
        expect(await nft.tokenOfOwnerByIndex(deployer.address, 0)).to.be.equal(0);
        expect(await nft.tokenURI(0)).to.be.equal("https://backend.gaiaprotocol.com/metadata/valkyrie/0");

        await nft.mint(deployer.address);
        expect(await nft.totalSupply()).to.be.equal(2);
        expect(await nft.balanceOf(deployer.address)).to.be.equal(2);
        expect(await nft.ownerOf(1)).to.be.equal(deployer.address);
        expect(await nft.tokenOfOwnerByIndex(deployer.address, 1)).to.be.equal(1);
        expect(await nft.tokenURI(1)).to.be.equal("https://backend.gaiaprotocol.com/metadata/valkyrie/1");
    });
});
