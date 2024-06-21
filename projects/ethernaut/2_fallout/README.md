## Description
I did the same as in the last task. 
```
contract.sendTransaction({ from: "0x8c5E11D36C3b42d258eB2DDB493e00A6d041fB69", value: toWei('0.0001')})
```
At first I thought that because there is no receive or fallback function, the transaction will fail and I will have to think. But I decided to try it anyway just in case. And it worked. I went to look into it anyway. 

## What I've learned
If there is no receive or fallback function, it means that you can't directly send funds to the contract, but you can call the payable method.