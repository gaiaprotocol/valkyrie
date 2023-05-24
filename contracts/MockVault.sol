// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract MockVault {
    function getBalance() external view returns(uint256) {}
    function withdraw(uint256 _amount) external {}
}
