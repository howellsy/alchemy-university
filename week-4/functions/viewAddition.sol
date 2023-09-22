// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  uint public x;

  constructor(uint _x) {
    x = _x;
  }

  function increment() external {
    x += 1;
  }

  function add(uint valueToAdd) external view returns (uint) {
    return x + valueToAdd;
  }
}
