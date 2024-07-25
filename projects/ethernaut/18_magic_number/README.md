```
contract DeployBytecode2 {
    address public deployedAddress;

    constructor() {
        address addr;
        bytes memory bytecode = hex"600a600c600039600a6000f3602a60505260206050f3";
        assembly {
            addr := create(0, add(bytecode, 0x20), mload(bytecode))
        }
        require(addr != address(0), "Deployment failed");
        deployedAddress = addr;
    }

    function tryToCall() public returns (uint) {
        (bool success, bytes memory returnData) = deployedAddress.call('');
        require(success, "Call failed");
        if (returnData.length >= 32) {
            return abi.decode(returnData, (uint));
        } else {
            revert("Invalid return data");
        }
    }
}
```
https://github.com/fvictorio/evm-puzzles