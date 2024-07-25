## Description
await contract.cryptoVault()
```
contract CryptoVaultBot is IDetectionBot {
    address private cryptoVault;

    constructor(address _cryptoVault) {
        cryptoVault = _cryptoVault;
    }

    function handleTransaction(address user, bytes calldata msgData) external override {
        address sender;
        assembly {
            sender := calldataload(0xa8)
        }

        if(sender == cryptoVault) {
            IForta(msg.sender).raiseAlert(user);
        }
    }
}
```

```
const contractAddress = '0xf312792342A631a51011081CaA6634D77d03a6F9';
const abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "detectionBotAddress",
                "type": "address"
            }
        ],
        "name": "setDetectionBot",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
];

const contract2 = new web3.eth.Contract(abi, contractAddress);
await contract2.methods.setDetectionBot("0x6B42818b8A5ec791012dA1db6f181ce593b8ec41").send({from:player});
```
