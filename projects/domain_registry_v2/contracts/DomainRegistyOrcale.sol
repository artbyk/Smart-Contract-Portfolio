// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./DomainUtils.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


//priceFeedAddress Sepolia ETH / USD 0x694AA1769357215DE4FAC081bf1f309aDC325306
//usdtAddress Sepolia 

contract DomainRegistry is Initializable, OwnableUpgradeable {
    uint256[50] __gap;

    using DomainUtils for string;

    struct Domain {
        address domainOwner;
        bool isReserved;
        uint256 registrationDate;
        address parentDomainOwner;
    }

    uint256 public CREATION_FEE_USD;
    uint256 public totalRegisteredDomains;
    mapping (string => Domain) public domains;
    AggregatorV3Interface internal priceFeed;
    IERC20 public usdtToken;

    event DomainRegistered(string domainName, address domainOwner, uint256 registrationDate, uint256 totalRegisteredDomains);

    function initialize(address initialOwner, address priceFeedAddress, address usdtAddress) public initializer {
        __Ownable_init(initialOwner);
        _transferOwnership(initialOwner);
        priceFeed = AggregatorV3Interface(priceFeedAddress);
        usdtToken = IERC20(usdtAddress);
    }

    modifier requirePaymentInETH() {
        uint256 ethPrice = getLatestETHPrice();
        uint256 requiredETH = (CREATION_FEE_USD * 1e18) / ethPrice;
        require(msg.value >= requiredETH, "Not enough ETH");
        _;
    }

    modifier requirePaymentInUSDT() {
        uint256 usdtAllowance = usdtToken.allowance(msg.sender, address(this));
        require(usdtAllowance >= CREATION_FEE_USD * 1e6, "Not enough USDT");
        _;
    }

    modifier isDomainNotReserved(string memory domainName) {
        require(!domains[domainName].isReserved, "Domain is already reserved");
        _;
    }

    function setCreationFee(uint256 creationFeeUSD) public onlyOwner {
        CREATION_FEE_USD = creationFeeUSD;
    }

    function getLatestETHPrice() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10); // Price is returned with 8 decimals, so multiply to get 18 decimals
    }

    function reserveDomainWithETH(string memory domainName) public requirePaymentInETH isDomainNotReserved(domainName) payable {
        _reserveDomain(domainName, msg.sender);
        distributeFees(domainName);
    }

    function reserveDomainWithUSDT(string memory domainName) public requirePaymentInUSDT isDomainNotReserved(domainName) {
        usdtToken.transferFrom(msg.sender, address(this), CREATION_FEE_USD * 1e6);
        _reserveDomain(domainName, msg.sender);
        distributeFees(domainName);
    }

    function _reserveDomain(string memory domainName, address domainOwner) internal {
        // Identify parent domain and its owner
        address parentOwner = address(0);
        string memory parentDomain = domainName.getParentDomain();

        if (bytes(parentDomain).length > 0 && domains[parentDomain].isReserved) {
            parentOwner = domains[parentDomain].domainOwner;
        }

        // Reserve the domain
        domains[domainName] = Domain({
            domainOwner: domainOwner,
            isReserved: true,
            registrationDate: block.timestamp,
            parentDomainOwner: parentOwner
        });

        totalRegisteredDomains++;
        emit DomainRegistered(domainName, domainOwner, block.timestamp, totalRegisteredDomains);
    }

    function distributeFees(string memory domainName) internal {
        address parentOwner = domains[domainName].parentDomainOwner;
        if (parentOwner != address(0)) {
            payable(parentOwner).transfer(address(this).balance / 2);
        }
    }

    function withdrawAll() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
        usdtToken.transfer(owner(), usdtToken.balanceOf(address(this)));
    }
}
