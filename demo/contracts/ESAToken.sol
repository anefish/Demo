pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract ESAToken is StandardToken {

  string public constant name = "ESA Token";
  string public constant symbol = "ESA";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 3000000000 * (10 ** uint256(decimals));

  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }

}
