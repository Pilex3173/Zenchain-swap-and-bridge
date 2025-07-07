const { ethers } = require("hardhat");

async function main() {
  const ethSepoliaAddr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";

  const [deployer] = await ethers.getSigners();
  const Receiver = await ethers.getContractFactory("SepoliaETHBridgeReceiver");
  const receiver = await Receiver.deploy(ethSepoliaAddr);
  await receiver.deployed();
  console.log("✅ SepoliaETHBridgeReceiver deployed at:", receiver.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
