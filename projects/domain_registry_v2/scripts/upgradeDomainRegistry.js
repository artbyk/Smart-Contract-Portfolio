import assert from "assert";

(async () => {
  const ContractV2 = await ethers.getContractFactory("contracts/DomainRegistry_v2.sol:DomainRegistry");
  const address = "0x0165878A594ca255338adfa4d48449f69242Eb8F"
  const upgradedToContractV2 = await upgrades.upgradeProxy(address, ContractV2);
  console.log("DomainRegistry_v2 upgraded\n");

  console.log("address:", address);
  console.log("DomainRegistry_v2 address:", await upgradedToContractV2.getAddress());

  assert(await upgradedToContractV2.getAddress() === address);

  console.log("\nAddresses are the same!")
})();
