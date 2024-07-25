const { ethers } = require("ethers");

async function main() {
    const hre = require("hardhat");
    const DomainRegistry = await hre.ethers.getContractFactory("DomainRegistry");
    domainRegistry = await DomainRegistry.deploy();

    domainName = "test";

    await domainRegistry.reserveDomain(domainName, {
        value: hre.ethers.parseEther("1.0"),
    });
    console.log("good");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
