// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
  function double(uint x) public pure returns (uint result) {
    result = x * 2;
  }

  function double(uint x, uint y) external pure returns (uint, uint) {
    return (double(x), double(y));
  }
}
