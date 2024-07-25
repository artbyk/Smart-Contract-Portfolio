import pkg from 'hardhat';
import { expect } from "chai";
const { ethers, upgrades } = pkg;

describe("DomainRegistry", function () {
  let DomainRegistryV1, DomainRegistryV2, domainRegistry, owner, addr1, addr2;

  beforeEach(async function () {
    DomainRegistryV1 = await ethers.getContractFactory("contracts/DomainRegistry.sol:DomainRegistry");
    DomainRegistryV2 = await ethers.getContractFactory("contracts/DomainRegistryUpgradable.sol:DomainRegistry");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the first version of the contract
    domainRegistry = await upgrades.deployProxy(DomainRegistryV1, [owner.address], { initializer: 'initialize' });

    // Upgrade to the second version of the contract
    domainRegistry = await upgrades.upgradeProxy(domainRegistry, DomainRegistryV2);
  });

  describe("Domain Registration", function () {
    it("Should register a domain successfully", async function () {
      const domainName = "example.com";

      const tx = await domainRegistry.connect(addr1).reserveDomain(domainName, { value: ethers.parseEther("1.0") });
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      await expect(tx)
        .to.emit(domainRegistry, "DomainRegistered")
        .withArgs(domainName, addr1.address, block.timestamp, 1);

      const domain = await domainRegistry.domains(domainName);
      expect(domain.domainOwner).to.equal(addr1.address);
      expect(domain.isReserved).to.be.true;
      expect(domain.registrationDate).to.equal(block.timestamp);
      expect(await domainRegistry.totalRegisteredDomains()).to.equal(1);
    });

    it("Should revert if the domain is already registered", async function () {
      const domainName = "example.com";
      await domainRegistry.connect(addr1).reserveDomain(domainName, { value: ethers.parseEther("1.0") });

      await expect(
        domainRegistry.connect(addr2).reserveDomain(domainName, { value: ethers.parseEther("1.0") })
      ).to.be.revertedWith("Domain is already reserved");
    });

    it("Should revert if the sent value is less than the CREATION_FEE", async function () {
      const domainName = "example.com";
      await expect(
        domainRegistry.connect(addr1).reserveDomain(domainName, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Not enough eth");
    });

    it("Should collect the correct metrics", async function () {
      const domainName1 = "example1.com";
      const domainName2 = "example2.com";

      await domainRegistry.connect(addr1).reserveDomain(domainName1, { value: ethers.parseEther("1.0") });
      await domainRegistry.connect(addr2).reserveDomain(domainName2, { value: ethers.parseEther("1.0") });

      expect(await domainRegistry.totalRegisteredDomains()).to.equal(2);

      const domain1 = await domainRegistry.domains(domainName1);
      const domain2 = await domainRegistry.domains(domainName2);

      expect(domain1.domainOwner).to.equal(addr1.address);
      expect(domain2.domainOwner).to.equal(addr2.address);
    });

    it("Should pay the parent domain owner correctly", async function () {
      const parentDomainName = "parent.com";
      const childDomainName = "child.parent.com";

      await domainRegistry.connect(addr1).reserveDomain(parentDomainName, { value: ethers.parseEther("1.0") });

      const initialBalance = await ethers.provider.getBalance(addr1.address);
      const tx = await domainRegistry.connect(addr2).reserveDomain(childDomainName, { value: ethers.parseEther("1.0") });
      await tx.wait();

      const finalBalance = await ethers.provider.getBalance(addr1.address);
      const expectedDifference = ethers.parseEther("0.5");

      // Calculate the actual difference using BigInt
      const actualDifference = finalBalance - initialBalance;

      expect(actualDifference).to.equal(expectedDifference);
    });

    it("Should pay the owner correctly", async function () {
      const domainName = "example.com";

      const initialBalance = await ethers.provider.getBalance(owner.address);
      const tx = await domainRegistry.connect(addr1).reserveDomain(domainName, { value: ethers.parseEther("1.0") });
      await tx.wait();

      const finalBalance = await ethers.provider.getBalance(owner.address);
      const expectedDifference = ethers.parseEther("1.0");

      // Calculate the actual difference using BigInt
      const actualDifference = finalBalance - initialBalance;

      expect(actualDifference).to.equal(expectedDifference);
    });

    it("Should allow the owner to change CREATION_FEE", async function () {
      const newFee = ethers.parseEther("2.0");

      // Change the creation fee as the owner
      await domainRegistry.connect(owner).setCreationFee(newFee);

      // Verify the fee was updated
      const updatedFee = await domainRegistry.CREATION_FEE();
      expect(updatedFee).to.equal(newFee);
    });

    it("Should not allow non-owner to change CREATION_FEE", async function () {
      const newFee = ethers.parseEther("2.0");

      // Attempt to change the creation fee as a non-owner
      await expect(domainRegistry.connect(addr1).setCreationFee(newFee)).to.be.reverted;

      // Verify the fee remains unchanged
      const currentFee = await domainRegistry.CREATION_FEE();
      expect(currentFee).to.not.equal(newFee);
    });

  });

  describe("Storage Comparison", function () {
    it("Should match storage layout between versions", async function () {
      // Deploy a new instance of the first version
      const domainRegistryV1 = await upgrades.deployProxy(DomainRegistryV1, [owner.address], { initializer: 'initialize' });

      // Register a domain with the first version
      const domainName = "example.com";
      await domainRegistryV1.connect(addr1).reserveDomain(domainName, { value: ethers.parseEther("1.0") });

      // Upgrade the contract
      const domainRegistryV2 = await upgrades.upgradeProxy(domainRegistryV1, DomainRegistryV2);

      // Compare storage values
      const domainV1 = await domainRegistryV1.domains(domainName);
      const domainV2 = await domainRegistryV2.domains(domainName);

      expect(domainV2.domainOwner).to.equal(domainV1.domainOwner);
      expect(domainV2.isReserved).to.equal(domainV1.isReserved);
      expect(domainV2.registrationDate).to.equal(domainV1.registrationDate);

      const totalRegisteredDomainsV1 = await domainRegistryV1.totalRegisteredDomains();
      const totalRegisteredDomainsV2 = await domainRegistryV2.totalRegisteredDomains();
      expect(totalRegisteredDomainsV2).to.equal(totalRegisteredDomainsV1);

      const creationFeeV1 = await domainRegistryV1.CREATION_FEE();
      const creationFeeV2 = await domainRegistryV2.CREATION_FEE();
      expect(creationFeeV2).to.equal(creationFeeV1);
    });
  });
});
