import assert from "assert";

(async () => {
  const ContractV2 = await ethers.getContractFactory("contracts/DomainRegistryUpgradable.sol:DomainRegistry");
  const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
  const upgradedToContractV2 = await upgrades.upgradeProxy(address, ContractV2);
  console.log("DomainRegistry_v2 upgraded\n");

  console.log("address:", address);
  console.log("DomainRegistry_v2 address:", await upgradedToContractV2.getAddress());

  assert(await upgradedToContractV2.getAddress() === address);

  console.log("\nAddresses are the same!")
})();
