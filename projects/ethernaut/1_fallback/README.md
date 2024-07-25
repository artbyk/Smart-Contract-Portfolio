## Description
I quickly realized how to solve this level, but the question for me was how to do it. I realized that I had to call a payable function to add myself to the mapping to get to the receive. I spent some time because I had mixed a bit (transfer, send, call) from solidity and wanted to solve this level through the call method. In the end I solved it with the help of:
```
contract.contribute.sendTransaction({ from: player, value: toWei('0.0001')})
```
And then:
```
contract.sendTransaction({ from: "player", value: toWei('0.0001')})
```
## What I've learned
I read about transfer, send, call, what are their differences and what is the purpose of each of them. Also read about SendTransaction.