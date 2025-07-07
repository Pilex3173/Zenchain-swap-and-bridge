// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract SwapZUSDTZCT {
    address public owner;
    IERC20 public zusdt;
    IERC20 public zct;

    constructor(address _zusdt, address _zct) {
        owner = msg.sender;
        zusdt = IERC20(_zusdt);
        zct = IERC20(_zct);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    function swapZUSDTtoZCT(uint256 amount) external {
        require(zusdt.transferFrom(msg.sender, address(this), amount), "ZUSDT transfer failed");
        require(zct.transfer(msg.sender, amount), "ZCT transfer failed");
    }

    function swapZCTtoZUSDT(uint256 amount) external {
        require(zct.transferFrom(msg.sender, address(this), amount), "ZCT transfer failed");
        require(zusdt.transfer(msg.sender, amount), "ZUSDT transfer failed");
    }

    function withdrawTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).transfer(owner, amount);
    }
}
