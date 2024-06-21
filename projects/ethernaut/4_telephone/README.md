## Description
That's a cool comprehension assignment. It helped me to understand it. Thanks to the author :)

I saw a good explanation on github. In a simple call chain A->B->C->D, inside D `msg.sender` will be C, and `tx.origin` will be A.

tx.origin - shows who called the transaction
msg.sender - shows who made the function call.

With `tx.origin` the owner can never be a contract.