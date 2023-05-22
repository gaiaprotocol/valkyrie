import { ethers } from "hardhat";

async function main() {
    const Valkyrie = await ethers.getContractFactory("Valkyrie");
    const valkyrie = await Valkyrie.deploy();
    await valkyrie.deployed();
    console.log(`Valkyrie address: ${valkyrie.address}`)
}

main()