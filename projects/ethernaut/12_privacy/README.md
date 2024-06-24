## Description
0 slot - bool public locked = true;
1 slot - uint256 public ID = block.timestamp;
2 slot -

```
uint8 private flattening = 10;
uint8 private denomination = 255;
uint16 private awkwardness = uint16(block.timestamp);
```
3,4,5 slot - bytes32[3] private data;
bytes16(data[2])) - the first 16 bytes. 
Parse data[2] via 
await web3.eth.getStorageAt('0xe1793885834F309AD562aA5b67c2DaC1dFe7f4a7',5);
Counted the first 16 bytes of the result and sent it
await contract.unlock(0xb5540b722b49bd2de96228ed61d9e3e4)