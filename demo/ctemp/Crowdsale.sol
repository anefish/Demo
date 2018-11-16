pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Crowdsale is Ownable {
  using SafeMath for uint;
  using SafeERC20 for ERC20;

  // The token being sold
  ERC20 public tokenReward;

  address public beneficiary;
  uint public amountRaised;
  uint public rate;
  mapping(address => uint) public balanceOf;

  bool crowdsaleClosed = false;

  event FundTransfer(address backer, uint amount, bool isContribution);

  /**
   * Constructor function
   *
   * Setup the owner
   */
  constructor(
    address _wallet,
    ERC20 _token
  ) public {
    require(_wallet != address(0));
    require(_token != address(0));

    beneficiary = _wallet;
    tokenReward = _token;
    rate = 100;
  }

  /**
   * Fallback function
   *
   * The function without name is the default function that is called whenever anyone sends funds to a contract
   */
  function () payable public {
    require(!crowdsaleClosed);

    uint amount = msg.value;
    balanceOf[msg.sender] = balanceOf[msg.sender].add(amount);
    amountRaised = amountRaised.add(amount);

    // calculate token amount to be created
    uint tokens = _getTokenAmount(amount);
    tokenReward.safeTransfer(msg.sender, tokens);
    emit FundTransfer(msg.sender, amount, true);
  }


  function _getTokenAmount(uint _weiAmount)
    internal view returns (uint) {
    return _weiAmount.mul(rate);
  }

  function closedCrowdsale() public onlyOwner {
    require(!crowdsaleClosed);
    crowdsaleClosed = true;
  }


  function safeWithdrawal() public onlyOwner {
    require(crowdsaleClosed);

    beneficiary.transfer(amountRaised);
    emit FundTransfer(beneficiary, amountRaised, false);
  }
}
