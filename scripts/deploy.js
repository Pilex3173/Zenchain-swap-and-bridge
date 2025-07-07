const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  const zusdtAddr = "0x249aaf2c2e5ab25518cc3dbc5be471eaf23686c2";
  const zctAddr = "0x83505A3447d50f74174a1b910115577D7f68dC07";

  const Swap = await ethers.getContractFactory("SwapZUSDTZCT");
  const swap = await Swap.deploy(zusdtAddr, zctAddr);
  await swap.deployed();
  console.log("✅ SwapZUSDTZCT deployed at:", swap.address);

  const Sender = await ethers.getContractFactory("ZUSDTBridgeSender");
  const sender = await Sender.deploy(zusdtAddr);
  await sender.deployed();
  console.log("✅ ZUSDTBridgeSender deployed at:", sender.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
