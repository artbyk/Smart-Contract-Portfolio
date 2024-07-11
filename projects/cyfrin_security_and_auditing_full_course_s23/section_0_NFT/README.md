```
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "twitterHandle",
                "type": "string"
            }
        ],
        "name": "solveChallenge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const contractAddress = '0x39338138414Df90EC67dC2EE046ab78BcD4F56D9';
const MyContract = new web3.eth.Contract(abi, contractAddress);
const twitterHandle = 'ChucklerTom';

await MyContract.methods.solveChallenge(twitterHandle).send({from: player})
```