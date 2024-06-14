// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DomainUtils {
    function getParentDomain(string memory domainName) internal pure returns (string memory) {
        bytes memory domainBytes = bytes(domainName);
        for (uint i = 0; i < domainBytes.length; i++) {
            if (domainBytes[i] == ".") {
                return substring(domainName, i + 1, domainBytes.length);
            }
        }
        return "";
    }

    function substring(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex - startIndex);
        for (uint i = startIndex; i < endIndex; i++) {
            result[i - startIndex] = strBytes[i];
        }
        return string(result);
    }
}
