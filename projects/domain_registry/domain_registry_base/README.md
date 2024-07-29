# domain_registry_base

This version allows users to register and manage domain names. The main components include:

- **Smart Contract: `DomainRegistry`**
  - Implements the functionality for domain registration.
  - Contains a `Domain` structure that stores information about the domain owner, reservation status, and registration date.
  
- **Key Functions:**
  - `reserveDomain(string memory domainName)`: Allows users to reserve a domain name if it is not already taken and if the sent value meets the required creation fee.
  - `setCreationFee(uint256 creationFee)`: Allows the contract owner to change the fee for domain registration.

- **Events:**
  - `DomainRegistered`: Emits an event upon successful registration of a domain, enabling transaction tracking.

- **Testing:**
  - Comprehensive unit tests are written using Chai, covering scenarios such as:
    - Successful domain registration.
    - Prevention of registering an already taken domain.
    - Handling insufficient payment amounts.
    - Tracking the total number of registered domains.

- **Deployment Script:**
  - `deployDomainRegistry.js`: Automates the deployment of the contract on a local node and reserves a test domain.

## Technologies Used

- **Solidity**: Smart contract programming language.
- **Hardhat**: Development environment for Ethereum.
- **Chai**: Assertion library for testing.
