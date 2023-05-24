import { expect } from "chai";
import { ethers } from "hardhat";

async function main() {
    const Valkyrie = await ethers.getContractFactory("Valkyrie");
    const valkyrie = Valkyrie.attach("0xdC5323d27c611D978E33B65ef9E1eA49fd9a0199");

    console.log(await valkyrie.totalSupply());
}

main();
