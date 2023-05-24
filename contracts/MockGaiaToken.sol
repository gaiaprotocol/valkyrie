// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract MockGaiaToken {
    function approve(address spender, uint256 amount) external returns (bool) {
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {}
}
