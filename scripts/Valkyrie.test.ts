import { expect } from "chai";
import { ethers } from "hardhat";

async function main() {
    const Valkyrie = await ethers.getContractFactory("Valkyrie");
    const valkyrie = Valkyrie.attach("0x480CEffe657cf6BD19d9C0171D42B73B6fFc2284");

    console.log(await valkyrie.totalSupply());
}

main();
