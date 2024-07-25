(async () => {
    const [deployer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("contracts/DomainRegistry.sol:DomainRegistry");
    // const contract = await Contract.deploy();
    const contract = await upgrades.deployProxy(Contract, [deployer.address], { initializer: 'initialize' });
    console.log("DomainRegistry deployed to:", await contract.getAddress());
  })();
  