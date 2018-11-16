pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract EthereumEternal is StandardToken {

  string public constant name = "Ethereum Eternal";
  string public constant symbol = "ETL";
  uint8 public constant decimals = 18;

  uint256 public constant INITIAL_SUPPLY = 10000000000 * (10 ** uint256(decimals));

  constructor() public {
    totalSupply_ = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
    emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
  }

}
