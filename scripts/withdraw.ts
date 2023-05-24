import { ethers } from "hardhat";

async function main() {
    const Vault = await ethers.getContractFactory("MockVault");
    const vault = Vault.attach("0xCb5EF0c6C6d8C18592ab1a9D83D4b1B73c03e713");

    console.log(await vault.getBalance());
    await (await vault.withdraw("3000000000000000000")).wait();
    console.log(await vault.getBalance());
}

main();
