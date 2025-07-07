require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.20",
  networks: {
    zenchain: {
      url: "https://rpc.zencahain.testnet", // ganti RPC nyata
      accounts: ["0xYOUR_PRIVATE_KEY"]
    },
    sepolia: {
      url: "https://rpc.sepolia.testnet",
      accounts: ["0xYOUR_PRIVATE_KEY"]
    }
  }
};
