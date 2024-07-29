// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DomainRegistry {
    struct Domain {
        address domainOwner;
        bool isReserved;
        uint256 registrationDate;
    }

    address public owner;
    uint256 public CREATION_FEE = 1 ether;
    uint256 public totalRegisteredDomains;
    mapping (string => Domain) public domains;

    event DomainRegistered(string domainName, address domainOwner, uint256 registrationDate, uint256 totalRegisteredDomains);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier requirePayment() {
        require(msg.value >= CREATION_FEE, "Not enough eth");
        _;
    }

    modifier isDomainNotReserved(string memory domainName) {
        require(!domains[domainName].isReserved, "Domain is already reserved");
        _;
    }

    function setCreationFee(uint256 creationFee) public onlyOwner {
        CREATION_FEE = creationFee;
    }

    function reserveDomain(string memory domainName) public requirePayment isDomainNotReserved(domainName) payable {
        domains[domainName] = Domain({
            domainOwner: msg.sender,
            isReserved: true,
            registrationDate: block.timestamp
        });

        totalRegisteredDomains++;
        emit DomainRegistered(domainName, msg.sender, block.timestamp, totalRegisteredDomains);
    }
    
}
