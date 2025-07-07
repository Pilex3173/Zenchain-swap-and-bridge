// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
interface IERC20 {
    function transferFrom(address, address, uint256) external returns (bool);
}
contract ZUSDTBridgeSender {
    address public owner;
    IERC20 public zusdt;
    event TokenLocked(address indexed sender, uint256 amount, address targetAddress);
    constructor(address _zusdt) {
        owner = msg.sender;
        zusdt = IERC20(_zusdt);
    }
    function bridgeToSepolia(address targetAddress, uint256 amount) external {
        require(zusdt.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        emit TokenLocked(msg.sender, amount, targetAddress);
    }
    function withdrawZUSDT(uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        zusdt.transfer(owner, amount);
    }
}
