require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    zenchainTestnet: {
      url: "https://zenchain-testnet.api.onfinality.io/public",
      chainId: 8408,
      accounts: [process.env.PRIVATE_KEY]
    },
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      chainId: 11155111,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};

