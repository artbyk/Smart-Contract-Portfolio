// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract ContractToPhone {
    ITelephone public telephoneContract;

    constructor(address _telephoneContract) {
        telephoneContract = ITelephone(_telephoneContract);
    }

    function changeOwner(address _owner) public {
        telephoneContract.changeOwner(_owner);
    }
}