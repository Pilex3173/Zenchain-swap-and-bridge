const { ethers } = require("ethers");
const senderAbi = [ "event TokenLocked(address,uint256,address)" ];
const providerZen = new ethers.providers.JsonRpcProvider("https://rpc.zencahain.testnet");
const providerSep = new ethers.providers.JsonRpcProvider("https://rpc.sepolia.testnet");
const bridgeSenderAddr = "ALAMAT_BRIDGE_SENDER";
const bridgeReceiverAddr = "ALAMAT_BRIDGE_RECEIVER";
const ethTokenAddr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
const relayerPrivKey = "your_privatekey";

const wallet = new ethers.Wallet(relayerPrivKey, providerSep);
const receiver = new ethers.Contract(bridgeReceiverAddr, [
  "function releaseETH(address to, uint256 amount) external"
], wallet);

(async () => {
  const zs = new ethers.Contract(bridgeSenderAddr, senderAbi, providerZen);
  zs.on("TokenLocked", async (user, amount, targetAddress) => {
    console.log("Locked:", user, amount.toString(), targetAddress);
    const tx = await receiver.releaseETH(targetAddress, amount);
    console.log("Released tx:", tx.hash);
  });
  console.log("Relayer running...");
})();
