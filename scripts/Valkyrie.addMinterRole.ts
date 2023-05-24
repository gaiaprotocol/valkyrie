import { expect } from "chai";
import { ethers } from "hardhat";

async function main() {
    const Valkyrie = await ethers.getContractFactory("Valkyrie");
    const valkyrie = Valkyrie.attach("0x480CEffe657cf6BD19d9C0171D42B73B6fFc2284");

    // minter
    await valkyrie.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", "0xd28e5B1bbFAF027cdda697a682e845376120FE56");

    console.log(`Valkyrie address: ${valkyrie.address}`);
}

main();
