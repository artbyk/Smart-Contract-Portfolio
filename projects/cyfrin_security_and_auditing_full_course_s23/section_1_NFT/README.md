Copied the abi from etherscan.
```
const abi = [{"inputs":[{"internalType":"address","name":"registry","type":"address"},{"internalType":"address","name":"helperContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"Challenge__CantBeZeroAddress","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"S1__WrongData","type":"error"},{"inputs":[],"name":"S1__WrongSelector","type":"error"},{"inputs":[],"name":"S1__ZeroAddress","type":"error"},...

const contractAddress = '0x76D2403b80591d5F6AF2b468BC14205fa5452AC0';
const MyContract = new web3.eth.Contract(abi, contractAddress);
const twitterHandle = 'ChucklerTom';

await MyContract.methods.getHelperContract().call({from: player})
```
Got the parameters for the function
```
contract S1{
    function getSelector()public pure returns(bytes memory) {
        bytes memory data = abi.encodeWithSignature("returnTrue()");
        return data;
    }

    function getData() public pure returns(bytes memory){
        bytes memory data = abi.encodeWithSignature("returnTrueWithGoodValues(uint256,address)",9,0x6E6Fe04023Fa82465418FE1b821134C039e44D2b);
        return data;
    }
}
```
Called a function with parameters
```
const contractAddress = '0x76D2403b80591d5F6AF2b468BC14205fa5452AC0';
const MyContract = new web3.eth.Contract(abi, contractAddress);
const param1 = '0xf613a687';
const param2 = '0x5a780edd00000000000000000000000000000000000000000000000000000000000000090000000000000000000000006e6fe04023fa82465418fe1b821134c039e44d2b';
const twitterHandle = 'ChucklerTom';

await MyContract.methods.solveChallenge(param1,param2,twitterHandle).send({from: player})
```