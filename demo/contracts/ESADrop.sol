pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ESADrop is Ownable {
  using SafeMath for uint;
  using SafeERC20 for ERC20;

  ERC20 public tokenReward;
  mapping(address => bool) public dropList;
  bool crowdsaleClosed = false;

  event FundTransfer(address backer, uint amount, bool isContribution);

  constructor(
    ERC20 _token
  ) public {
    require(_token != address(0));
    tokenReward = _token;
  }

  function () payable public {
    require(!crowdsaleClosed);
    require(msg.value == 0);
    require(!dropList[msg.sender]);

    uint tokens = uint(100).mul(10 ** uint(18));
    tokenReward.safeTransfer(msg.sender, tokens);
    dropList[msg.sender] = true;

    emit FundTransfer(msg.sender, msg.value, false);
  }

  function switchCrowdsale() public onlyOwner {
    crowdsaleClosed = !crowdsaleClosed;
  }
  function isClosed() public view returns(bool) {
    return crowdsaleClosed;
  }
}
