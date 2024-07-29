# Token integration

This project demonstrates a comprehensive example of integrating a frontend and backend application with a smart contract to issue and manage custom tokens. The project utilizes Hardhat for smart contract development, deployment, and testing. The frontend is equipped with MetaMask integration, allowing users to interact seamlessly with the blockchain.

#### Features

1. **Frontend Integration with MetaMask**
   - Allows users to transfer the issued token with MetaMask confirmation.
   - Displays the total supply of issued tokens.
   - Queries and displays the token balance of any address.

2. **Backend API**
   - **POST /mint**: Endpoint to mint new tokens.
   - **GET /balance/:address**: Endpoint to retrieve the token balance of a specific address.

3. **Hardhat Setup**
   - **MyToken.sol**: Simple ERC20 token contract with a minting function.
   - **deploy.js**: Script to deploy the token contract to a blockchain network.

