require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.20",
  networks: {
    zenchain: {
      url: "https://zenchain-testnet.api.onfinality.io/public",
      accounts: ["0x33df525bd7dd787b4ceb82baca3b3d47c241d9a2"]
    },
    sepolia: {
      url: "https://rpc.sepolia.testnet",
      accounts: ["0x33df525bd7dd787b4ceb82baca3b3d47c241d9a2"]
    }
  }
};
