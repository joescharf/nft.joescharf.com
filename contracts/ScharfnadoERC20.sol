// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract ScharfnadoERC20 is ERC20PresetMinterPauser {
  constructor() ERC20PresetMinterPauser("Scharfnado", "SNADO") {
    _mint(msg.sender, 1000000 * 10**decimals());
  }
}
