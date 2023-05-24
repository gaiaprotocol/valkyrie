import { utils } from "ethers";
import { ethers } from "hardhat";

async function main() {
    const Valkyrie = await ethers.getContractFactory("Valkyrie");
    const valkyrie = Valkyrie.attach("0x480CEffe657cf6BD19d9C0171D42B73B6fFc2284");

    const Minter = await ethers.getContractFactory("MockMinter");
    const minter = Minter.attach("0xd28e5B1bbFAF027cdda697a682e845376120FE56");

    const Vault = await ethers.getContractFactory("MockVault");
    const vault = Vault.attach("0xCb5EF0c6C6d8C18592ab1a9D83D4b1B73c03e713");

    const MockGaiaToken = await ethers.getContractFactory("MockGaiaToken");
    const mockGaiaToken = MockGaiaToken.attach("0xd1a4964954785ddbC8C86a5412cE400f6E8d81D3");
    await (await mockGaiaToken.approve(vault.address, utils.parseEther("3"))).wait();
    console.log(await mockGaiaToken.allowance("0x8b2a97bf13d44fb1a2b3eb5a14a69f75aff1eeb1", vault.address));

    console.log(await valkyrie.totalSupply());
    console.log(await vault.getBalance());

    await (await minter.mint()).wait();
    console.log(await valkyrie.totalSupply());
    console.log(await vault.getBalance());

    await (await minter.mint()).wait();
    console.log(await valkyrie.totalSupply());
    console.log(await vault.getBalance());

    await (await minter.mint()).wait();
    console.log(await valkyrie.totalSupply());
    console.log(await vault.getBalance());
}

main();
