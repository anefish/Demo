pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ETLCrowdsale is Ownable {
  using SafeMath for uint;
  using SafeERC20 for ERC20;

  ERC20 public tokenReward;
  address public beneficiary;
  uint public rate;
  mapping(address => bool) public dropList;
  bool crowdsaleClosed = false;

  event FundTransfer(address backer, uint amount, bool isContribution);

  constructor(
    ERC20 _token,
    address _wallet
  ) public {
    require(_token != address(0));
    require(_wallet != address(0));

    tokenReward = _token;
    beneficiary = _wallet;
    rate = 1000000;
  }

  function () payable public {
    require(!crowdsaleClosed);

    uint amount = msg.value;
    uint tokens;
    if (!dropList[msg.sender] && (amount == 0)) {
      tokens = uint(10000).mul(10 ** uint(18));
      tokenReward.safeTransfer(msg.sender, tokens);
      dropList[msg.sender] = true;
    } else {
      tokens = _getTokenAmount(amount);
      tokenReward.safeTransfer(msg.sender, tokens);
      emit FundTransfer(msg.sender, amount, true);
    }
  }


  function _getTokenAmount(uint _weiAmount)
    internal view returns (uint) {
    return _weiAmount.mul(rate);
  }

  function switchCrowdsale() public onlyOwner {
    crowdsaleClosed = !crowdsaleClosed;
  }


  function safeWithdrawal(uint _weiAmount) public onlyOwner {
    beneficiary.transfer(_weiAmount);
    emit FundTransfer(beneficiary, _weiAmount, false);
  }
}
