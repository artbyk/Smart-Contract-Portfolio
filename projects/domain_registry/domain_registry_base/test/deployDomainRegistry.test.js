import pkg from 'hardhat';
import { expect } from "chai";
const { ethers } = pkg;

describe("DomainRegistry", function () {
  let DomainRegistry, domainRegistry, owner, addr1, addr2;

  beforeEach(async function () {
    DomainRegistry = await ethers.getContractFactory("DomainRegistry");
    [owner, addr1, addr2] = await ethers.getSigners();
    domainRegistry = await DomainRegistry.deploy();
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
  });
});
