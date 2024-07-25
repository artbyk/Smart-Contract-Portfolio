// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./DomainUtils.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract DomainRegistry is Initializable, OwnableUpgradeable {
    uint256[50] __gap;

    using DomainUtils for string;

    struct Domain {
        address domainOwner;
        bool isReserved;
        uint256 registrationDate;
        address parentDomainOwner;
    }

    uint256 public CREATION_FEE;
    uint256 public totalRegisteredDomains;
    mapping (string => Domain) public domains;

    event DomainRegistered(string domainName, address domainOwner, uint256 registrationDate, uint256 totalRegisteredDomains);

    function initialize(address initialOwner) public initializer {
        __Ownable_init(initialOwner);
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
        // Identify parent domain and its owner
        address parentOwner = address(0);
        string memory parentDomain = domainName.getParentDomain();

        if (bytes(parentDomain).length > 0 && domains[parentDomain].isReserved) {
            parentOwner = domains[parentDomain].domainOwner;
        }

        // Reserve the domain
        domains[domainName] = Domain({
            domainOwner: msg.sender,
            isReserved: true,
            registrationDate: block.timestamp,
            parentDomainOwner: parentOwner
        });

        // Distribute fees
        if (parentOwner != address(0)) {
            payable(parentOwner).transfer(msg.value / 2);
        }
        payable(owner()).transfer(address(this).balance);

        totalRegisteredDomains++;
        emit DomainRegistered(domainName, msg.sender, block.timestamp, totalRegisteredDomains);
    }
}
