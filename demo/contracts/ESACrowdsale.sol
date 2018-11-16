pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract ESACrowdsale is Ownable {
  using SafeMath for uint;
  using SafeERC20 for ERC20;

  address public wallet1;
  address public wallet2;
  address public wallet3;
  address public wallet4;
  address public wallet5;
  ERC20 public tokenReward;

  uint public rate;
  uint public amountRaised;
  bool public crowdsaleClosed;
  mapping(address => uint) public balanceOf;
  /* mapping(address => uint) public balanceOfToken; */

  event FundTransfer(address backer, uint amount, bool isContribution);

  constructor(
    address _wallet1,
    address _wallet2,
    address _wallet3,
    address _wallet4,
    address _wallet5,
    ERC20 _token
  ) public {
    require(_wallet1 != address(0));
    require(_wallet2 != address(0));
    require(_wallet3 != address(0));
    require(_wallet4 != address(0));
    require(_wallet5 != address(0));
    require(_token != address(0));

    wallet1 = _wallet1;
    wallet2 = _wallet2;
    wallet3 = _wallet3;
    wallet4 = _wallet4;
    wallet5 = _wallet5;
    tokenReward = _token;
    rate = 50000;
  }

  function () payable public {
    require(!crowdsaleClosed);

    uint amount = msg.value;
    balanceOf[msg.sender] = balanceOf[msg.sender].add(amount);
    amountRaised = amountRaised.add(amount);

    uint tokens = _getTokenAmount(amount);
    tokenReward.safeTransfer(msg.sender, tokens);
    emit FundTransfer(msg.sender, amount, true);
  }


  function _getTokenAmount(uint _weiAmount)
    internal view returns (uint) {
    return _weiAmount.mul(rate);
  }

  function setRate(uint _rate) public onlyOwner {
    rate = _rate;
  }

  function switchCrowdsale() public onlyOwner {
    crowdsaleClosed = !crowdsaleClosed;
  }


  function safeWithdrawal() public onlyOwner {
    require(crowdsaleClosed);

    /* this.balance */
    uint amount = amountRaised.div(5);

    amountRaised = 0;

    wallet1.transfer(amount);
    emit FundTransfer(wallet1, amount, false);
    wallet2.transfer(amount);
    emit FundTransfer(wallet2, amount, false);
    wallet3.transfer(amount);
    emit FundTransfer(wallet3, amount, false);
    wallet4.transfer(amount);
    emit FundTransfer(wallet4, amount, false);
    wallet5.transfer(amount);
    emit FundTransfer(wallet5, amount, false);
  }
}
