```
const contractAddress = '0xA2626bE06C11211A44fb6cA324A67EBDBCd30B70';
const MyContract = new web3.eth.Contract(abi, contractAddress);
const twitterHandle = 'ChucklerTom';
const uint_param = await web3.eth.getStorageAt("0xA2626bE06C11211A44fb6cA324A67EBDBCd30B70", 777);
await MyContract.methods.solveChallenge(uint_param, twitterHandle).send({ from: player });
```