require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.20",
  networks: {
    zenchain: {
      url: "https://rpc.zencahain.testnet", // ganti RPC nyata
      accounts: ["0x83ba0c4b37cf06e99d2f07ff32750debb3b4fae521e49cc7454e9be7c3125fdb"]
    },
    sepolia: {
      url: "https://rpc.sepolia.testnet",
      accounts: ["0x83ba0c4b37cf06e99d2f07ff32750debb3b4fae521e49cc7454e9be7c3125fdb"]
    }
  }
};
