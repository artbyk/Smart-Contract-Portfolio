```
const contractAddress = '0x34d130B174F4a30A846FED7C02FCF53A19a4c2B6';
const MyContract = new web3.eth.Contract(abi, contractAddress);
const twitterHandle = 'ChucklerTom';

await MyContract.methods.solveChallenge("true",twitterHandle).send({from: player})
```