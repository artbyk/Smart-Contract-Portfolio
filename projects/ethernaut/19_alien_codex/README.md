## Description
bytes32[] public codex; - the array size is specified from the first slot, checked via storageAt.

I tried codex.length--; and got 0xfff...., which allows to add an element at any index. And we can use the revise function. Now it remains to find the index number to redefine slot 0 and put our address there, which will be read as the owner's address (checked through contract.owner and storageAt 0).  

I got the number of the slot from which the data storage starts using:
```
function getCodexStorageSlot() public pure returns (bytes32) {
        uint256 slot = 1; // индекс слота для массива codex, так как contact находится в слоте 0
        console.log(uint256(keccak256(abi.encode(slot))));
        return keccak256(abi.encode(slot));
    }
```
The result is - 80084422859880547211683076133703299733277748156566366325829078699459944778998

We subtract this number from uint256 max and get the index number. add to this norm + 1 to get to the zero slot and add our address not forgetting that we still have a bool variable in the first slot.

Slot - 35707666377435648211887908874984608119992236509074197713628505308453184860938