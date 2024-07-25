## Description
I made another contract in which coinFlip is counted in advance as in the main contract. The transactions of the attacking contract and the main contract should be in one block. And as far as I understand with this method there may be cases when transactions will still be in different blocks. I haven't looked at other people's solutions, maybe my solution is not completely correct. 
It was handy to do it through remix because it immediately catches the error when lastHash == blockValue.
