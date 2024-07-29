# domain_registry_upgradable_orace

This version of the Domain Registry builds upon the foundational concepts of the initial version, introducing upgradeability and enhanced payment functionalities. This version leverages the OpenZeppelin Upgrades library and Chainlink oracles to allow domain registration payments in both ETH and a stablecoin equivalent to USD (such as USDT). Additionally, it includes comprehensive security analysis and gas optimization.

This version introduces several new features and improvements:

- **Upgradeability:**
  - Utilizing OpenZeppelin's upgradeable contracts, this version allows the smart contract to be upgraded seamlessly, ensuring that new functionalities can be added without losing existing state or data.

- **Smart Contract: `DomainRegistry`**
  - The contract has been modified to accept payments in both ETH and USDT, allowing greater flexibility for users.
  
- **Key Functions:**
  - `reserveDomainWithETH(string memory domainName)`: Allows users to reserve a domain name using ETH, with the required amount dynamically calculated based on the current ETH price.
  - `reserveDomainWithUSDT(string memory domainName)`: Enables users to reserve a domain using USDT, ensuring that all fees are denominated in USD.
  - `setCreationFee(uint256 creationFeeUSD)`: Allows the contract owner to set or update the creation fee in USD.

- **Price Feed Integration:**
  - Integration with Chainlink oracles to fetch the current price of ETH in USD, ensuring that the contract accurately reflects real-time exchange rates.

- **Domain Reservation Logic:**
  - Enhanced logic for domain reservations, allowing for hierarchical ownership (parent and child domains). If a domain is a subdomain, the parent domain owner receives a portion of the fees.

- **Payment Distribution:**
  - Payments are distributed between the contract owner and the parent domain owner (if applicable), promoting fair compensation within the domain ecosystem.

- **Security Analysis and Optimization:**
  - Utilized tools such as **Slither** and **Aderyn** for automated analysis and vulnerability detection.
  - Conducted a manual audit of the contract to ensure security best practices were followed.
  - Implemented gas optimizations to reduce transaction costs and enhance efficiency.

- **Testing:**
  - Extensive unit tests cover various scenarios, including:
    - Successful domain registration with both ETH and USDT.
    - Correct fee distribution to parent domain owners.
    - Functionality to ensure only the contract owner can update fees.

- **Deployment Script:**
  - Scripts for deploying the proxy contract and upgrading it to the new version are included, facilitating the upgrade process in a local development environment.

## Payment Mechanism

This version allows domain developers and controllers to receive payments in both ETH and a stablecoin (e.g., USDT) equivalent to USD. All contract usage fees are denominated in USD. For instance, if the registration fee for a domain name is $50, users can pay either 50 USDT or its current equivalent in ETH. This ensures users can choose their preferred payment method based on market conditions.

## Technologies Used

- **Solidity**: Smart contract programming language.
- **Hardhat**: Development environment for Ethereum.
- **OpenZeppelin**: Libraries for secure smart contract development and upgradeability.
- **Chainlink**: Oracles for fetching real-time data (e.g., ETH price).
- **Slither**: Tool for static analysis of Solidity code.
- **Aderyn**: Tool for additional smart contract analysis and verification.
