// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ScharfnadoFaucet is Ownable {
  IERC20 public scharfnado;

  constructor(address _scharfnado) {
    scharfnado = IERC20(_scharfnado);
  }

  function setScharfnado(address _scharfnado) external onlyOwner {
    scharfnado = IERC20(_scharfnado);
  }

  function dispense() external payable {
    scharfnado.transfer(msg.sender, 1 ether);
  }
}
