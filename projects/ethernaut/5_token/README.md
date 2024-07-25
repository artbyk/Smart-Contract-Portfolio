## Description
I didn't know about this vulnerability. Thanks again to the author for helping me figure it out.
At first I tried:
```
await contract.transfer(player, 100)
```
but for some reason it doesn't work that way. It worked when I sent it to an address other than my own. I still don't understand why it doesn't work with player's address.