// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
interface IERC20Mintable {
    function transfer(address to, uint256 amount) external returns (bool);
}
contract SepoliaETHBridgeReceiver {
    address public relayer;
    IERC20Mintable public ethToken;
    constructor(address _ethToken) {
        relayer = msg.sender;
        ethToken = IERC20Mintable(_ethToken);
    }
    function releaseETH(address to, uint256 amount) external {
        require(msg.sender == relayer, "Only relayer");
        ethToken.transfer(to, amount);
    }
}
